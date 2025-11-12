#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Install dependencies using npm
console.log('Installing dependencies with npm...');

const npmInstall = spawn('npm', ['install'], {
    stdio: 'inherit',
    cwd: __dirname
});

npmInstall.on('close', (code) => {
    if (code === 0) {
        console.log('Dependencies installed successfully!');
        
        // Generate Prisma client
        console.log('Generating Prisma client...');
        const prismaGenerate = spawn('npx', ['prisma', 'generate'], {
            stdio: 'inherit',
            cwd: __dirname,
            env: { ...process.env, NODE_ENV: 'development' }
        });
        
        prismaGenerate.on('close', (generateCode) => {
            if (generateCode === 0) {
                console.log('Prisma client generated successfully!');
                
                // Run type checking
                console.log('Running type checking...');
                const typecheck = spawn('npx', ['tsc', '--noEmit'], {
                    stdio: 'inherit',
                    cwd: __dirname
                });
                
                typecheck.on('close', (typecheckCode) => {
                    if (typecheckCode === 0) {
                        console.log('✅ Type checking passed! Backend is ready.');
                    } else {
                        console.log('❌ Type checking failed.');
                        process.exit(typecheckCode);
                    }
                });
            } else {
                console.log('❌ Prisma client generation failed.');
                process.exit(generateCode);
            }
        });
    } else {
        console.log('❌ Dependency installation failed.');
        process.exit(code);
    }
});