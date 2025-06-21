#!/bin/bash

# IIT Palakkad Website - Production Deployment Script
echo "🚀 Starting production deployment for IIT Palakkad Website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running TypeScript checks..."
npx tsc --noEmit

# Run linting
echo "🧹 Running ESLint..."
npx eslint . --ext .ts,.tsx,.js,.jsx --fix

# Build the project
echo "🏗️ Building production bundle..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo ""
    echo "🌐 Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Vercel"
    echo "3. Set environment variables in Vercel dashboard"
    echo "4. Deploy!"
    echo ""
    echo "📋 Required environment variables for Vercel:"
    echo "- ADMIN_PASSWORD"
    echo "- JWT_SECRET"
    echo "- NEXTAUTH_SECRET"
    echo "- SESSION_TIMEOUT (optional, default: 24h)"
    echo "- MAX_LOGIN_ATTEMPTS (optional, default: 5)"
    echo "- LOCKOUT_DURATION (optional, default: 15m)"
else
    echo "❌ Build failed. Please fix the errors above before deploying."
    exit 1
fi
