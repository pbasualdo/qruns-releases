# Install-Certificate.ps1
# Installs the self-signed certificate to the Trusted Root Certification Authorities store.
# This enables the Auto-Update functionality for IT Quick Runbooks.

$ErrorActionPreference = "Stop"

$certPath = Join-Path $PSScriptRoot "..\qruns_selfsigned.pfx"
$passwordString = "TsuvdZj28p8tUbC2Lz9_qrun"

if (-not (Test-Path $certPath)) {
    Write-Error "Certificate file not found at: $certPath"
    exit 1
}

try {
    Write-Host "Installing certificate to Trusted Root store..." -ForegroundColor Cyan
    Write-Host "NOTE: A Windows Security confirmation dialog may appear. Please click 'Yes' to proceed." -ForegroundColor Yellow
    
    $password = ConvertTo-SecureString $passwordString -AsPlainText -Force
    Import-PfxCertificate -FilePath $certPath -CertStoreLocation "Cert:\CurrentUser\Root" -Password $password | Out-Null
    
    Write-Host "✅ Certificate installed successfully!" -ForegroundColor Green
    Write-Host "Auto-updates should now work." -ForegroundColor Green
}
catch {
    Write-Error "Failed to install certificate: $_"
    exit 1
}
