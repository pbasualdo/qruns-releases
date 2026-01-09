$ErrorActionPreference = "Stop"

$pfxPassword = "TsuvdZj28p8tUbC2Lz9_qrun"
$certSubject = "CN=QuickRunbooks SelfSigned"
$pfxFile = Join-Path $PSScriptRoot "..\qruns_selfsigned.pfx"

Write-Host "Generating Self-Signed Certificate..." -ForegroundColor Cyan

# Create Cert
$cert = New-SelfSignedCertificate `
    -CertStoreLocation Cert:\CurrentUser\My `
    -Subject $certSubject `
    -KeyAlgorithm RSA `
    -KeyLength 2048 `
    -Provider "Microsoft Enhanced RSA and AES Cryptographic Provider" `
    -KeyExportPolicy Exportable `
    -KeyUsage DigitalSignature `
    -Type CodeSigningCert `
    -NotAfter (Get-Date).AddYears(5)

# Export PFX
$pass = ConvertTo-SecureString -String $pfxPassword -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath $pfxFile -Password $pass

Write-Host "Success!" -ForegroundColor Green
Write-Host "--------------------------------------------------"
Write-Host "Certificate Path: $pfxFile"
Write-Host "Password:         $pfxPassword"
Write-Host "--------------------------------------------------"
Write-Host ""
Write-Host "To use this for building, run these commands in PowerShell before 'npm run dist':" -ForegroundColor Yellow
Write-Host "`$env:CSC_LINK=`"$pfxFile`""
Write-Host "`$env:CSC_KEY_PASSWORD=`"$pfxPassword`""
