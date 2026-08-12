@echo off
REM deploy.bat - init (if needed), commit + push to GitHub Pages
REM Run from the Portfolio-Website folder (double-click or terminal).

set REMOTE=https://github.com/mazenwaelx/Portfolio-Website.git
set REPO=Portfolio-Website

REM --- init repo if not already a git repo ---
if not exist .git (
    echo [1/5] Initializing git repository...
    git init
    git branch -M main
    git remote add origin %REMOTE%
) else (
    echo [1/5] Git repo already present.
)

REM --- make sure remote points at the right place ---
for /f %%i in ('git remote get-url origin 2^>nul') do set CUR=%%i
if not defined CUR (
    git remote add origin %REMOTE%
) else (
    if not "%%CUR%%"=="%REMOTE%" git remote set-url origin %REMOTE%
)

echo [2/5] Staging files...
git add .

echo [3/5] Committing...
git commit -m "Update portfolio - %date% %time%" || (
    echo Nothing to commit, or commit failed. Continuing to push.
)

echo [4/5] Pushing to origin/main...
git push -u origin main
if errorlevel 1 (
    echo.
    echo ============================================================
    echo PUSH FAILED.
    echo Common causes:
    echo   1. Not signed in to Git (a browser popup should appear, or
    echo      set a token:  git config --global credential.helper store)
    echo   2. The repo URL/name is wrong.
    echo   3. Repo is empty on GitHub but named correctly? It must exist.
    echo ============================================================
    pause
    exit /b 1
)

echo.
echo [5/5] Done. Wait ~1 min, then visit:
echo https://mazenwaelx.github.io/%REPO%
echo Then enable: GitHub Settings -> Pages -> Source: Deploy from a branch -> main / (root)
pause
