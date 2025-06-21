# Deployment Guide - IIT Palakkad Website

## 🚨 Important: Public Visibility Warning

**When you deploy this website, here's what will be publicly accessible:**

### ✅ Public (Anyone can see)
- Main website pages (Home, People, Publications, etc.)
- All uploaded media files in `/uploads/` directory
- Any images/videos you upload through admin panel
- File URLs like: `yoursite.com/uploads/images/photo.jpg`

### 🔒 Protected (Password required)
- Admin panel (`yoursite.com/admin`)
- Media upload functionality
- Content management features

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set environment variables in Vercel dashboard
ADMIN_PASSWORD=YourSecurePassword123!
```

### Option 2: Netlify
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
# Upload the 'out' or '.next' folder

# 3. Set environment variables in Netlify dashboard
ADMIN_PASSWORD=YourSecurePassword123!
```

### Option 3: Traditional Hosting
```bash
# 1. Build for production
npm run build

# 2. Upload files to your hosting provider
# 3. Configure environment variables
```

## Pre-Deployment Checklist

### 1. Set Admin Password
Create `.env.local` file:
```bash
ADMIN_PASSWORD=YourVerySecurePassword123!
```

### 2. Test Locally
```bash
npm run dev
# Visit http://localhost:3000/admin
# Test login with your password
# Upload a test image
# Verify it appears in media library
```

### 3. Review Content
- [ ] Remove any test/placeholder content
- [ ] Verify all images are appropriate for public viewing
- [ ] Check that sensitive documents aren't uploaded
- [ ] Review people profiles and contact information

### 4. Security Review
- [ ] Admin password is strong (12+ characters, mixed case, numbers, symbols)
- [ ] No sensitive information in uploaded files
- [ ] Understand that uploaded files will be publicly accessible

## Post-Deployment Steps

### 1. Test Admin Access
```bash
# Visit your deployed site
https://yoursite.com/admin

# Should redirect to login page
# Test login with your password
# Verify admin panel works
```

### 2. Test Media Upload
- Upload a test image
- Verify it appears in media library
- Test copying URL and using in people section
- Confirm image displays on public site

### 3. Verify Public Access
```bash
# Test that main site is accessible
https://yoursite.com

# Test that uploaded files are accessible
https://yoursite.com/uploads/images/your-uploaded-file.jpg
```

## File Visibility Examples

### What People Can Access
```bash
# ✅ These URLs will be publicly accessible:
https://yoursite.com/
https://yoursite.com/people
https://yoursite.com/publications
https://yoursite.com/uploads/images/team-photo.jpg
https://yoursite.com/uploads/documents/research-paper.pdf

# 🔒 These require password:
https://yoursite.com/admin
https://yoursite.com/admin/login
```

### Search Engine Visibility
- Your main website will appear in Google search results
- Uploaded images may appear in Google Images
- PDF documents may be indexed by search engines
- Use robots.txt to control what gets indexed

## Environment Variables Setup

### Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `ADMIN_PASSWORD` = `YourSecurePassword`

### Netlify
1. Go to Netlify Dashboard
2. Select your site
3. Go to Site Settings → Environment Variables
4. Add: `ADMIN_PASSWORD` = `YourSecurePassword`

### Other Platforms
Check your hosting provider's documentation for setting environment variables.

## Domain Configuration

### Custom Domain
1. Purchase domain (e.g., research.iitpkd.ac.in)
2. Configure DNS settings
3. Update hosting platform settings
4. Enable HTTPS/SSL

### Subdomain Setup
```bash
# Examples:
research.iitpkd.ac.in
lab.iitpkd.ac.in
faculty.iitpkd.ac.in
```

## Backup Strategy

### What to Backup
1. **Source Code**: Keep in Git repository
2. **Uploaded Files**: `/public/uploads/` directory
3. **Media Metadata**: `/public/uploads/media-data.json`
4. **Environment Variables**: Document your settings

### Automated Backups
```bash
# Example backup script
#!/bin/bash
# Backup uploaded files
tar -czf backup-$(date +%Y%m%d).tar.gz public/uploads/

# Upload to cloud storage
# aws s3 cp backup-$(date +%Y%m%d).tar.gz s3://your-backup-bucket/
```

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor admin access logs
- [ ] Review uploaded files monthly
- [ ] Update admin password quarterly
- [ ] Clean up unused media files
- [ ] Update dependencies regularly

### Performance Monitoring
- [ ] Check site loading speed
- [ ] Monitor file storage usage
- [ ] Review image optimization
- [ ] Check mobile responsiveness

## Troubleshooting

### Common Issues

**Admin login not working:**
- Check environment variable is set correctly
- Verify password doesn't have special characters that need escaping
- Clear browser cookies and try again

**Files not uploading:**
- Check file size (max 50MB)
- Verify file type is supported
- Check hosting provider's upload limits

**Images not displaying:**
- Verify file URL is correct
- Check file permissions
- Ensure file actually uploaded successfully

## Security Best Practices

### For Public Websites
1. Use strong admin passwords
2. Regular security updates
3. Monitor access logs
4. Backup regularly
5. Use HTTPS only

### For Sensitive Content
If you're handling sensitive information:
1. Consider implementing protected file serving
2. Add user authentication
3. Use role-based access control
4. Implement audit logging
5. Consider private hosting

## Need Help?

### Common Questions
**Q: Can I make uploaded files private?**
A: Yes, but requires additional implementation. Let me know if you need this.

**Q: How do I remove files from public access?**
A: Delete them through the admin panel, or implement protected file serving.

**Q: Can I password-protect the entire site?**
A: Yes, this can be implemented. Useful for internal/private websites.

### Getting Support
If you encounter issues during deployment:
1. Check the console for error messages
2. Verify environment variables are set
3. Test locally first
4. Check hosting provider documentation
5. Ask for help with specific error messages

Remember: Once deployed, your uploaded media files will be publicly accessible to anyone who knows the URLs. Plan accordingly!
