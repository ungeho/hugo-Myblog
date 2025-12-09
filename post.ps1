param(
    [Parameter(Mandatory=$true)]
    [string]$name
)

hugo new "posts/$name.md"
# Write-Host "New post created: posts/$name.md"
