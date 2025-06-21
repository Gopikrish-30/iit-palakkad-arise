@echo off
echo 🚀 Starting production deployment for IIT Palakkad Website...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm ci

echo 🔍 Running TypeScript checks...
call npx tsc --noEmit

echo 🧹 Running ESLint...
call npx eslint . --ext .ts,.tsx,.js,.jsx --fix

echo 🏗️ Building production bundle...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful! Ready for deployment.
    echo.
    echo 🌐 Next steps:
    echo 1. Push your code to GitHub
    echo 2. Connect your repository to Vercel
    echo 3. Set environment variables in Vercel dashboard
    echo 4. Deploy!
    echo.
    echo 📋 Required environment variables for Vercel:
    echo - ADMIN_PASSWORD
    echo - JWT_SECRET
    echo - NEXTAUTH_SECRET
    echo - SESSION_TIMEOUT (optional, default: 24h)
    echo - MAX_LOGIN_ATTEMPTS (optional, default: 5)
    echo - LOCKOUT_DURATION (optional, default: 15m)
) else (
    echo ❌ Build failed. Please fix the errors above before deploying.
    pause
    exit /b 1
)

pause
