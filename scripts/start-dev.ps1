$env:Path = "C:\Program Files\nodejs;" + $env:Path
Set-Location "D:\GPI W"
& "C:\Program Files\nodejs\node.exe" "node_modules\next\dist\bin\next" dev -H 0.0.0.0
