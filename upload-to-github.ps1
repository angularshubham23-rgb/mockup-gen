param(
  [string]$repoName = $(Split-Path -Leaf $PWD),
  [string]$visibility = 'public'
)

Write-Host "Preparing to upload current project to GitHub as '$repoName' (visibility: $visibility)" -ForegroundColor Cyan

# Check for gh (GitHub CLI)
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh) {
  Write-Host "Found gh CLI — attempting to create repository and push" -ForegroundColor Green
  try {
    gh auth status -s 2>$null
  } catch {
    Write-Host "You need to sign in with the GitHub CLI first: gh auth login" -ForegroundColor Yellow
    exit 1
  }

  # create repo using gh if remote not present
  $remote = git remote get-url origin 2>$null
  if ($remote) {
    Write-Host "A remote origin already exists: $remote" -ForegroundColor Yellow
    Write-Host "If this is not expected, remove the remote and retry: git remote remove origin" -ForegroundColor Yellow
    exit 0
  }

  # Create repo and push
  gh repo create $repoName --$visibility --source . --remote origin --push -y
  Write-Host "Created and pushed to GitHub using gh" -ForegroundColor Green
  exit 0
}

Write-Host "gh CLI not found. I'll show manual steps you can run to upload the repo to GitHub." -ForegroundColor Yellow
Write-Host "1) Create an empty repository on GitHub at https://github.com/new (pick name '$repoName')" -ForegroundColor Cyan
Write-Host "2) In this folder run the following commands in PowerShell (replace <your-remote-url> with the HTTPS or SSH URL GitHub provides):" -ForegroundColor Cyan
Write-Host "`n    git remote add origin <your-remote-url>`n    git branch -M main`n    git push -u origin main`n" -ForegroundColor Green

Write-Host "If you'd like, install the GitHub CLI (https://cli.github.com) and run this script again to automate the creation step." -ForegroundColor Cyan
