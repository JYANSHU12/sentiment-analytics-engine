@echo off
echo ========================================================
echo Starting Sentiment Analytics Backend (Flask on Port 5001)
echo ========================================================
cd /d "%~dp0backend"
python app.py
if errorlevel 1 (
    echo.
    echo Backend encountered an issue. Press any key to close.
    pause
)
