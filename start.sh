#!/bin/bash

echo "========================================"
echo "  eFood Table Mock API Server"
echo "  Starting server..."
echo "========================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "Starting server..."
echo ""
echo "Server will be available at:"
echo "  - API: http://localhost:3000"
echo "  - Admin Panel: http://localhost:3000/admin.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start

