param(
    [Parameter(Mandatory=$true)]
    [string]$name,

    [ValidateSet("default", "tech", "game", "memo", "waymark")]
    [string]$type = "default",

    [switch]$bilingual
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $repoRoot
try {
    if ($type -eq "waymark" -and $bilingual) {
        hugo new --kind waymark "posts/$name.md"
        hugo new --kind waymark-en "posts/$name.en.md"
    }
    else {
        hugo new --kind $type "posts/$name.md"
    }
}
finally {
    Pop-Location
}
