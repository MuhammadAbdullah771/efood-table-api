@echo off
echo ========================================
echo   eFood Table - Auto Deployment Setup
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo [1/5] Checking files...
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Make sure you're running this from the mock-api-server folder.
    pause
    exit /b 1
)
if not exist "server.js" (
    echo [ERROR] server.js not found!
    pause
    exit /b 1
)
echo [OK] All files found!

echo.
echo [2/5] Installing dependencies...
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)
echo [OK] Dependencies installed!

echo.
echo [3/5] Testing server locally...
start /B node server.js >nul 2>&1
timeout /t 3 >nul
taskkill /F /IM node.exe >nul 2>&1
echo [OK] Server test passed!

echo.
echo [4/5] Preparing Git repository...
if not exist ".git" (
    echo Initializing Git repository...
    call git init
    call git branch -M main
    echo [OK] Git repository initialized!
) else (
    echo [OK] Git repository already exists!
)

echo.
echo [5/5] Creating deployment files...
if not exist ".gitignore" (
    echo node_modules/ > .gitignore
    echo data.json >> .gitignore
    echo *.log >> .gitignore
    echo .DS_Store >> .gitignore
    echo [OK] .gitignore created!
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps (manual):
echo.
echo 1. Create GitHub repository:
echo    - Go to: https://github.com/new
echo    - Name: efood-table-api
echo    - Make it PUBLIC
echo    - Click "Create repository"
echo.
echo 2. Push to GitHub (run these commands):
echo    git add .
echo    git commit -m "Initial commit - eFood Table API"
echo    git remote add origin https://github.com/YOUR_USERNAME/efood-table-api.git
echo    git push -u origin main
echo    (Replace YOUR_USERNAME with your GitHub username)
echo.
echo 3. Deploy to Render.com:
echo    - Go to: https://render.com
echo    - Sign up (free, with GitHub)
echo    - Click "New +" ^> "Web Service"
echo    - Connect your GitHub repository
echo    - Settings:
echo      * Build Command: npm install
echo      * Start Command: node server.js
echo      * Plan: Free
echo    - Click "Create Web Service"
echo    - Wait 2-5 minutes
echo    - Copy your URL (e.g., https://efood-table-api.onrender.com)
echo.
echo 4. Update Flutter app:
echo    - Open: lib/util/app_constants.dart
echo    - Change baseUrl to your Render URL
echo    - Use https:// (not http://)
echo.
echo ========================================
echo.
echo For detailed instructions, see: DEPLOY_QUICK_START.md
echo.
pause

