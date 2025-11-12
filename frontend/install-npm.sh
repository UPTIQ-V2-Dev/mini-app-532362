#!/bin/bash
echo "Installing dependencies with npm..."

# Remove pnpm lock file if it exists
if [ -f "pnpm-lock.yaml" ]; then
    mv pnpm-lock.yaml pnpm-lock.yaml.bak
    echo "Backed up pnpm-lock.yaml"
fi

# Install with npm
npm install

# Build the project
npm run build

echo "Installation and build completed successfully!"