#!/bin/bash

# GitHub Deployment Script for IIT Palakkad Website
echo "🚀 Preparing IIT Palakkad Website for GitHub deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if GitHub remote is configured
if ! git remote get-url origin | grep -q "github.com/Gopikrish-30/iit-palakkad-arise"; then
    echo "🔧 Configuring GitHub remote..."
    git remote set-url origin https://github.com/Gopikrish-30/iit-palakkad-arise.git
    echo "✅ GitHub remote configured"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run quality checks
echo "🔍 Running TypeScript checks..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found. Please fix before deploying."
    exit 1
fi

echo "🧹 Running ESLint..."
npx eslint . --ext .ts,.tsx,.js,.jsx --fix

# Test build
echo "🏗️ Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Commit and push to GitLab
    echo "📤 Pushing to GitLab..."
    git add .
    git commit -m "Production ready deployment - $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    
    echo ""
    echo "🎉 Successfully pushed to GitLab!"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Go to https://gitlab.com/Gopikrish-30/iit-palakkad"
    echo "2. Set up Vercel integration (see GITLAB-DEPLOYMENT.md)"
    echo "3. Configure environment variables in Vercel"
    echo "4. Deploy!"
    echo ""
    echo "📋 Required environment variables for Vercel:"
    echo "- ADMIN_PASSWORD (your secure admin password)"
    echo "- JWT_SECRET (32+ character random string)"
    echo "- NEXTAUTH_SECRET (32+ character random string)"
    echo "- SESSION_TIMEOUT (default: 24h)"
    echo "- MAX_LOGIN_ATTEMPTS (default: 5)"
    echo "- LOCKOUT_DURATION (default: 15m)"
    echo ""
    echo "📖 Full deployment guide: GITLAB-DEPLOYMENT.md"
else
    echo "❌ Build failed. Please fix the errors above before deploying."
    exit 1
fi
