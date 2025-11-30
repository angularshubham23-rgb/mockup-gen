# Simple PowerShell helper to start the server and client in separate terminals
Write-Output "Starting mockup-gen server and client (dev)..."

Push-Location -Path "$PSScriptRoot\server"
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm install; npm run dev'
Pop-Location

Push-Location -Path "$PSScriptRoot\client"
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm install; npm run dev'
Pop-Location

Write-Output "Started – check open terminals for server and client logs."
