$env:Path = "C:\Program Files\nodejs;" + $env:Path
$env:NODE_ENV = "production"
$env:HOST = "127.0.0.1"
$env:PORT = "3000"
Set-Location "D:\GPI W"
& "C:\Program Files\nodejs\node.exe" "scripts\server.mjs"
