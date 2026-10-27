@echo off
echo ========================================================
echo Launching Real-Time Customer Sentiment Analytics Engine
echo ========================================================
start "Sentiment Backend" "%~dp0start_backend.bat"
start "Sentiment Frontend" "%~dp0start_frontend.bat"
