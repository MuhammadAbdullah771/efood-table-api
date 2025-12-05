@echo off
echo ========================================
echo   eFood Table Mock API Server
echo   Starting server...
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting server...
echo.
echo Server will be available at:
echo   - API: http://localhost:3000
echo   - Admin Panel: http://localhost:3000/admin.html
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

