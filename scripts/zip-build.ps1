# Produces a Linux-friendly zip of public/ with forward-slash paths.
# Replaces PowerShell's Compress-Archive which uses Windows backslashes
# and breaks on Linux servers (Netlify, etc).

param(
  [string]$SourceDir = (Join-Path $PSScriptRoot '..\public'),
  [string]$OutFile   = (Join-Path $PSScriptRoot '..\a2z-retail-build.zip')
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$SourceDir = (Resolve-Path $SourceDir).Path
if (-not (Test-Path $SourceDir)) { Write-Error "Missing: $SourceDir"; exit 1 }
if (Test-Path $OutFile) { Remove-Item $OutFile -Force }

$baseLen = $SourceDir.TrimEnd('\').Length + 1
$zip = [IO.Compression.ZipFile]::Open($OutFile, [IO.Compression.ZipArchiveMode]::Create)
try {
  $count = 0
  Get-ChildItem -LiteralPath $SourceDir -Recurse -File -Force | ForEach-Object {
    $rel = $_.FullName.Substring($baseLen).Replace('\', '/')
    $entry = $zip.CreateEntry($rel, [IO.Compression.CompressionLevel]::Optimal)
    $stream = $entry.Open()
    try {
      $src = [IO.File]::OpenRead($_.FullName)
      try { $src.CopyTo($stream) } finally { $src.Dispose() }
    } finally { $stream.Dispose() }
    $count++
  }
  Write-Host "Wrote $count entries -> $OutFile"
} finally {
  $zip.Dispose()
}

$size = [Math]::Round((Get-Item $OutFile).Length / 1MB, 2)
Write-Host "Size: ${size} MB"
