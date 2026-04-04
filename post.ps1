param(
    [Parameter(Mandatory=$true)]
    [string]$name,

    [ValidateSet("default", "tech", "game", "memo")]
    [string]$type = "default"
)

$target = "posts/$name.md"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $repoRoot
try {
    hugo new --kind $type $target
}
finally {
    Pop-Location
}
