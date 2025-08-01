# Security Guide for IIT Palakkad Website

## Current Security Status - UPGRADED TO ENTERPRISE LEVEL

### ✅ What's Protected Now (ENHANCED)
- **Admin Interface**: Secure session-based authentication with rate limiting
- **Media Upload API**: Protected with session validation and CSRF protection
- **Session Management**: Enterprise-grade secure session tokens
- **Rate Limiting**: IP-based login attempt limiting with lockout
- **Audit Logging**: Comprehensive security event logging
- **CSRF Protection**: Origin and referer validation

### ⚠️ What's Still Public
- **Uploaded Media Files**: Files in `/uploads/` are publicly accessible (by design)
- **Website Content**: All public pages are accessible to everyone (by design)
- **Media URLs**: Anyone with the direct URL can view uploaded files (by design)

## Security Levels Explained

### ✅ Level 3: Enterprise Security (CURRENT IMPLEMENTATION)
```
✅ Session-based authentication with secure tokens
✅ Rate limiting for login attempts (5 attempts max)
✅ IP-based account lockout (15 minutes)
✅ CSRF protection with origin validation
✅ Secure HTTP-only cookies
✅ Comprehensive audit logging
✅ Time-constant password comparison
✅ Secure session management
✅ Protected API routes
✅ Environment-based configuration
```

## Security Features Implemented

### Authentication & Authorization
- **Session-based Authentication**: Uses secure 32-byte random tokens
- **Rate Limiting**: Maximum 5 failed login attempts per IP address
- **Account Lockout**: 15-minute lockout after exceeding failed attempts
- **Secure Cookies**: HTTP-only, secure, SameSite strict cookies
- **CSRF Protection**: Validates request origin and referer headers
- **Time-constant Comparison**: Prevents timing attacks on password verification

### Session Management
- **Secure Token Generation**: Uses Node.js crypto.randomBytes()
- **Session Expiration**: 24-hour session timeout with automatic cleanup
- **Session Invalidation**: Proper logout with immediate session destruction
- **Session Validation**: Real-time session verification on each request

### Security Monitoring & Logging
- **Audit Logging**: All security events logged with timestamps and IP addresses
- **Failed Login Tracking**: IP-based tracking with automatic lockout
- **Unauthorized Access Logging**: Logs attempts to access protected resources
- **Security Event Types**:
  - `SUCCESSFUL_LOGIN` - Successful admin login
  - `FAILED_LOGIN` - Failed login attempt
  - `LOGOUT` - User logout
  - `RATE_LIMITED_LOGIN` - Login blocked due to rate limiting
  - `UNAUTHORIZED_ACCESS_ATTEMPT` - Attempt to access admin without session
  - `UNAUTHORIZED_API_ACCESS` - Attempt to access protected API without session
  - `CSRF_ATTEMPT` - Request blocked due to invalid origin

## Quick Setup Instructions

### 1. Environment Configuration (ALREADY CONFIGURED)
The system is already configured with a secure `.env.local` file:
```bash
# Admin Authentication Configuration
ADMIN_PASSWORD=SecureAdminPassword123!
JWT_SECRET=your-super-secure-jwt-secret-key-here-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key-here-change-this-in-production

# Security Settings
SESSION_TIMEOUT=24h
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=15m
```

**⚠️ IMPORTANT**: Change these values in production!

### 2. Test the Secure Authentication
```bash
npm run dev
# Visit http://localhost:3000/admin
# You'll be redirected to login page
# Use password: SecureAdminPassword123!
# Test failed login attempts (should lock after 5 attempts)
# Test logout functionality
# Verify session persistence across page refreshes
```

### 3. Security Testing Checklist
- [ ] Login with correct password works
- [ ] Login with incorrect password fails
- [ ] Rate limiting activates after 5 failed attempts
- [ ] Session persists across page refreshes
- [ ] Logout properly destroys session
- [ ] Direct access to /admin redirects to login when not authenticated
- [ ] API routes are protected and return 401 when not authenticated
- [ ] Security events are logged in console

### 4. Upload Media (Secure Process)
1. Login to admin panel with secure authentication
2. Go to Media tab
3. Upload your files (protected by session validation)
4. Copy URLs to use in other sections

## Media File Visibility Options

### Option A: Keep Files Public (Current)
**Pros:**
- Simple setup
- Fast loading
- Works with CDNs
- No server processing needed

**Cons:**
- Anyone can access files with direct URLs
- No access control
- Files visible to search engines

**Use Case:** Public website content, logos, public images

### Option B: Protect Media Files
If you want to protect uploaded files, here's how:

1. **Move uploads outside public directory**
2. **Create protected file serving API**
3. **Add authentication checks**

Would you like me to implement protected file serving?

## Hosting Considerations

### Public Hosting (Vercel, Netlify, etc.)
```bash
# Your files will be accessible at:
https://yoursite.com/uploads/images/photo.jpg

# Anyone in the world can access this URL
```

### Private Hosting Options
1. **Password-protect entire site**
2. **Use private repositories**
3. **Implement user authentication**
4. **Use cloud storage with access controls**

## Recommended Security Measures

### For Public Websites
1. ✅ Keep current setup
2. ✅ Use strong admin password
3. ✅ Regular backups
4. ✅ Monitor access logs
5. ✅ Update dependencies

### For Private/Internal Websites
1. ✅ Implement protected file serving
2. ✅ Add user authentication
3. ✅ Use HTTPS only
4. ✅ Implement rate limiting
5. ✅ Add audit logging

## Implementation Examples

### Protect Specific File Types
```typescript
// Only protect sensitive documents
if (request.nextUrl.pathname.includes('/uploads/documents/')) {
  // Require authentication
}
// Keep images public
```

### Role-Based Access
```typescript
// Different access levels
const userRole = getUserRole(request)
if (userRole === 'admin') {
  // Full access
} else if (userRole === 'editor') {
  // Limited access
} else {
  // Public access only
}
```

## Quick Security Checklist

### Before Going Live
- [ ] Set strong admin password in `.env.local`
- [ ] Test admin login functionality
- [ ] Verify file upload works
- [ ] Check media URLs are accessible
- [ ] Test logout functionality
- [ ] Review what should be public vs private

### After Going Live
- [ ] Monitor admin access logs
- [ ] Regular password updates
- [ ] Backup uploaded files
- [ ] Monitor file storage usage
- [ ] Review and clean unused files

## FAQ

### Q: Will my uploaded photos be visible to everyone?
**A:** Yes, currently uploaded files are publicly accessible if someone knows the URL. The admin interface is protected, but the files themselves are public.

### Q: How do I make files private?
**A:** You would need to implement protected file serving (I can help with this). Files would be moved outside the public directory and served through an authenticated API.

### Q: Is this secure enough for a university website?
**A:** For public content (research photos, publications, etc.), yes. For sensitive documents, consider implementing protected file serving.

### Q: Can I password-protect the entire website?
**A:** Yes, you can add authentication to all routes, not just admin. This would make the entire site private.

### Q: What happens if someone guesses my file URLs?
**A:** They can access the files directly. Use protected file serving if this is a concern.

## Need More Security?

If you need enhanced security features like:
- Protected file serving
- User management
- Role-based access
- Database authentication
- Audit logging

Let me know and I can implement these features for you!

## Contact for Security Questions

If you have specific security requirements or concerns, please provide details about:
1. What type of content you're hosting
2. Who should have access
3. Your security requirements
4. Compliance needs (if any)

This will help determine the best security approach for your use case.
