@echo off
title GPI W Website Server
set "PATH=C:\Program Files\nodejs;%PATH%"
set "NODE_ENV=production"
set "HOST=127.0.0.1"
set "PORT=3000"
cd /d "D:\GPI W"
echo Starting GPI W website...
echo Open http://127.0.0.1:3000 in Chrome.
echo Keep this window open.
"C:\Program Files\nodejs\node.exe" "scripts\server.mjs"
echo.
echo Server stopped. Read any error above.
pause
