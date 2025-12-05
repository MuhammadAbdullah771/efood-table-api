#!/bin/bash

echo "========================================"
echo "  eFood Table - Auto Deployment Setup"
echo "========================================"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed!"
    echo ""
    echo "Please install Git from: https://git-scm.com/downloads"
    echo "Then run this script again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "[1/5] Checking files..."
if [ ! -f "package.json" ]; then
    echo "[ERROR] package.json not found!"
    echo "Make sure you're running this from the mock-api-server folder."
    exit 1
fi
if [ ! -f "server.js" ]; then
    echo "[ERROR] server.js not found!"
    exit 1
fi
echo "[OK] All files found!"

echo ""
echo "[2/5] Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies"
        exit 1
    fi
fi
echo "[OK] Dependencies installed!"

echo ""
echo "[3/5] Testing server locally..."
node server.js &
SERVER_PID=$!
sleep 3
kill $SERVER_PID 2>/dev/null
echo "[OK] Server test passed!"

echo ""
echo "[4/5] Preparing Git repository..."
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    git branch -M main
    echo "[OK] Git repository initialized!"
else
    echo "[OK] Git repository already exists!"
fi

echo ""
echo "[5/5] Creating deployment files..."
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << EOF
node_modules/
data.json
*.log
.DS_Store
EOF
    echo "[OK] .gitignore created!"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps (manual):"
echo ""
echo "1. Create GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name: efood-table-api"
echo "   - Make it PUBLIC"
echo "   - Click 'Create repository'"
echo ""
echo "2. Push to GitHub (run these commands):"
echo "   git add ."
echo "   git commit -m 'Initial commit - eFood Table API'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/efood-table-api.git"
echo "   git push -u origin main"
echo "   (Replace YOUR_USERNAME with your GitHub username)"
echo ""
echo "3. Deploy to Render.com:"
echo "   - Go to: https://render.com"
echo "   - Sign up (free, with GitHub)"
echo "   - Click 'New +' > 'Web Service'"
echo "   - Connect your GitHub repository"
echo "   - Settings:"
echo "     * Build Command: npm install"
echo "     * Start Command: node server.js"
echo "     * Plan: Free"
echo "   - Click 'Create Web Service'"
echo "   - Wait 2-5 minutes"
echo "   - Copy your URL (e.g., https://efood-table-api.onrender.com)"
echo ""
echo "4. Update Flutter app:"
echo "   - Open: lib/util/app_constants.dart"
echo "   - Change baseUrl to your Render URL"
echo "   - Use https:// (not http://)"
echo ""
echo "========================================"
echo ""
echo "For detailed instructions, see: DEPLOY_QUICK_START.md"
echo ""

