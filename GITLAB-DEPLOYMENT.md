# 🚀 GitLab Deployment Guide - IIT Palakkad Website

## 📋 Repository Setup

### **Step 1: Push to GitLab Repository**

```bash
# Add GitLab remote (if not already added)
git remote add origin https://gitlab.com/Gopikrish-30/iit-palakkad.git

# Or update existing remote
git remote set-url origin https://gitlab.com/Gopikrish-30/iit-palakkad.git

# Push all files to GitLab
git add .
git commit -m "Production ready deployment - Complete admin system"
git push -u origin main
```

### **Step 2: Verify Repository Structure**

Ensure these files are in your GitLab repository:
```
├── .gitlab-ci.yml          # CI/CD pipeline configuration
├── vercel.json             # Vercel deployment config
├── .env.example            # Environment variables template
├── DEPLOYMENT.md           # Deployment instructions
├── PRODUCTION-CHECKLIST.md # Production checklist
├── README.md               # Project documentation
├── app/                    # Next.js application
├── components/             # React components
├── lib/                    # Utilities and data context
└── public/                 # Static assets
```

## 🔧 Vercel Integration Setup

### **Step 3: Connect Vercel to GitLab**

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your account

2. **Import GitLab Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose "GitLab" as the provider
   - Authorize Vercel to access your GitLab account
   - Select the repository: `Gopikrish-30/iit-palakkad`

3. **Configure Project Settings**:
   - **Project Name**: `iit-palakkad`
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### **Step 4: Set Environment Variables in Vercel**

In your Vercel project dashboard, add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_PASSWORD` | `YourSecurePassword123!` | Strong admin password |
| `JWT_SECRET` | `your-32-character-jwt-secret` | JWT signing secret |
| `NEXTAUTH_SECRET` | `your-32-character-nextauth-secret` | NextAuth secret |
| `SESSION_TIMEOUT` | `24h` | Session duration |
| `MAX_LOGIN_ATTEMPTS` | `5` | Max failed login attempts |
| `LOCKOUT_DURATION` | `15m` | Account lockout duration |

**🔐 Generate secure secrets:**
```bash
# Generate random 32-character strings for secrets
openssl rand -base64 32
```

### **Step 5: Configure GitLab CI/CD Variables**

In your GitLab project, go to **Settings > CI/CD > Variables** and add:

| Variable | Value | Protected | Masked |
|----------|-------|-----------|--------|
| `VERCEL_TOKEN` | Your Vercel API token | ✅ | ✅ |
| `VERCEL_ORG_ID` | Your Vercel organization ID | ✅ | ❌ |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | ✅ | ❌ |

**To get these values:**

1. **Vercel Token**:
   - Go to Vercel Dashboard > Settings > Tokens
   - Create a new token with appropriate scope

2. **Organization ID & Project ID**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   
   # Get IDs from .vercel/project.json
   cat .vercel/project.json
   ```

## 🚀 Deployment Process

### **Automatic Deployment**

Once configured, deployments happen automatically:

1. **Push to main branch** → Triggers production deployment
2. **Create merge request** → Triggers preview deployment
3. **Manual deployment** → Available in GitLab CI/CD pipelines

### **Manual Deployment**

1. **Via GitLab CI/CD**:
   - Go to your GitLab project
   - Navigate to **CI/CD > Pipelines**
   - Click "Run Pipeline" on main branch
   - Manually trigger the "deploy_production" job

2. **Via Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

## 🌐 Custom Domain Setup

### **Step 6: Configure Custom Domain (Optional)**

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click "Domains" tab
   - Add your domain (e.g., `research.iitpkd.ac.in`)

2. **DNS Configuration**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or follow Vercel's specific DNS instructions

## 📊 Monitoring & Maintenance

### **GitLab CI/CD Pipeline**

The pipeline includes:
- ✅ **Linting**: Code quality checks
- ✅ **Type Checking**: TypeScript validation
- ✅ **Build Testing**: Production build verification
- ✅ **Automatic Deployment**: To Vercel on main branch
- ✅ **Preview Deployments**: For merge requests

### **Deployment URLs**

- **Production**: `https://iit-palakkad.vercel.app`
- **Admin Panel**: `https://iit-palakkad.vercel.app/admin`
- **Preview**: Generated for each merge request

## 🔧 Troubleshooting

### **Common Issues**

1. **Pipeline Fails**:
   - Check GitLab CI/CD variables are set
   - Verify Vercel token has correct permissions
   - Review pipeline logs in GitLab

2. **Deployment Fails**:
   - Check environment variables in Vercel
   - Verify build succeeds locally
   - Review Vercel deployment logs

3. **Admin Login Issues**:
   - Verify `ADMIN_PASSWORD` environment variable
   - Check `JWT_SECRET` and `NEXTAUTH_SECRET` are set
   - Test in incognito mode

### **Support Resources**

- **GitLab Documentation**: [docs.gitlab.com](https://docs.gitlab.com)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Project Issues**: Use GitLab Issues for bug reports

## 🎉 Success!

Your IIT Palakkad website is now:

✅ **Hosted on GitLab**: `https://gitlab.com/Gopikrish-30/iit-palakkad`  
✅ **Deployed on Vercel**: `https://iit-palakkad.vercel.app`  
✅ **Admin Panel Ready**: `https://iit-palakkad.vercel.app/admin`  
✅ **CI/CD Pipeline**: Automatic deployments configured  
✅ **Production Ready**: All admin sections functional  

**Next Steps:**
1. Push your code to GitLab
2. Configure Vercel integration
3. Set environment variables
4. Deploy and test!

---

*Happy deploying! 🚀*
