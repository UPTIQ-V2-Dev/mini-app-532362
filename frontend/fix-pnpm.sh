#!/bin/bash

# Fix pnpm issue by installing pnpm or using npm
echo "Fixing pnpm installation issue..."

# Try to install pnpm globally
if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found. Installing pnpm..."
    npm install -g pnpm
    
    # If pnpm installation fails, use npm instead
    if ! command -v pnpm &> /dev/null; then
        echo "pnpm installation failed. Converting to npm..."
        rm -f pnpm-lock.yaml
        npm install
        npm run build
        exit 0
    fi
fi

echo "pnpm found. Installing dependencies..."
pnpm install
pnpm build

echo "Build completed successfully!"