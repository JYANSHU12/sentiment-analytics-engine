@echo off
echo ========================================================
echo Starting Sentiment Analytics Frontend (React on Port 3000)
echo ========================================================
cd /d "%~dp0frontend"
npm start
if errorlevel 1 (
    echo.
    echo Frontend encountered an issue. Press any key to close.
    pause
)
