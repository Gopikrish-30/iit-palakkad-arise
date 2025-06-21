@echo off
echo 🚀 Preparing IIT Palakkad Website for GitLab deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Check and configure GitLab remote
echo 🔧 Configuring GitLab remote...
git remote set-url origin https://gitlab.com/Gopikrish-30/iit-palakkad.git
echo ✅ GitLab remote configured

echo 📦 Installing dependencies...
call npm ci

echo 🔍 Running TypeScript checks...
call npx tsc --noEmit

if %errorlevel% neq 0 (
    echo ❌ TypeScript errors found. Please fix before deploying.
    pause
    exit /b 1
)

echo 🧹 Running ESLint...
call npx eslint . --ext .ts,.tsx,.js,.jsx --fix

echo 🏗️ Testing production build...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Commit and push to GitLab
    echo 📤 Pushing to GitLab...
    git add .
    git commit -m "Production ready deployment - %date% %time%"
    git push origin main
    
    echo.
    echo 🎉 Successfully pushed to GitLab!
    echo.
    echo 🌐 Next steps:
    echo 1. Go to https://gitlab.com/Gopikrish-30/iit-palakkad
    echo 2. Set up Vercel integration (see GITLAB-DEPLOYMENT.md)
    echo 3. Configure environment variables in Vercel
    echo 4. Deploy!
    echo.
    echo 📋 Required environment variables for Vercel:
    echo - ADMIN_PASSWORD (your secure admin password)
    echo - JWT_SECRET (32+ character random string)
    echo - NEXTAUTH_SECRET (32+ character random string)
    echo - SESSION_TIMEOUT (default: 24h)
    echo - MAX_LOGIN_ATTEMPTS (default: 5)
    echo - LOCKOUT_DURATION (default: 15m)
    echo.
    echo 📖 Full deployment guide: GITLAB-DEPLOYMENT.md
) else (
    echo ❌ Build failed. Please fix the errors above before deploying.
    pause
    exit /b 1
)

pause
