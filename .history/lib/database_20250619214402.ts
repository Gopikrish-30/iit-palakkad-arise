// Using Web Crypto API for better compatibility

// Simple in-memory database for development (replace with real database in production)
interface AdminUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: 'super_admin' | 'admin' | 'editor'
  isActive: boolean
  isEmailVerified: boolean
  emailVerificationToken?: string
  passwordResetToken?: string
  passwordResetExpiry?: Date
  lastLogin?: Date
  loginAttempts: number
  lockedUntil?: Date
  twoFactorSecret?: string
  twoFactorEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

interface AuditLog {
  id: string
  userId?: string
  action: string
  details: any
  ipAddress: string
  userAgent: string
  timestamp: Date
}

interface LoginAttempt {
  id: string
  email: string
  ipAddress: string
  success: boolean
  timestamp: Date
  userAgent: string
}

// In-memory storage (replace with real database in production)
const adminUsers = new Map<string, AdminUser>()
const auditLogs: AuditLog[] = []
const loginAttempts: LoginAttempt[] = []

// Initialize with super admin if not exists
export async function initializeDatabase() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@iitpkd.ac.in'
  
  if (!adminUsers.has(superAdminEmail)) {
    const superAdmin: AdminUser = {
      id: generateId(),
      email: superAdminEmail,
      name: process.env.SUPER_ADMIN_NAME || 'Super Administrator',
      passwordHash: await hashPassword(process.env.SUPER_ADMIN_PASSWORD || 'SuperSecurePassword123!'),
      role: 'super_admin',
      isActive: true,
      isEmailVerified: true,
      loginAttempts: 0,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    adminUsers.set(superAdminEmail, superAdmin)
    
    await logAuditEvent({
      action: 'SUPER_ADMIN_CREATED',
      details: { email: superAdminEmail },
      ipAddress: 'system',
      userAgent: 'system'
    })
  }
}

// User Management Functions
export async function createAdminUser(userData: {
  email: string
  name: string
  password: string
  role: 'admin' | 'editor'
  createdBy: string
}): Promise<AdminUser> {
  const existingUser = adminUsers.get(userData.email)
  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const user: AdminUser = {
    id: generateId(),
    email: userData.email,
    name: userData.name,
    passwordHash: await hashPassword(userData.password),
    role: userData.role,
    isActive: true,
    isEmailVerified: false,
    emailVerificationToken: generateToken(),
    loginAttempts: 0,
    twoFactorEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  adminUsers.set(userData.email, user)

  await logAuditEvent({
    userId: userData.createdBy,
    action: 'ADMIN_USER_CREATED',
    details: { 
      newUserEmail: userData.email, 
      newUserRole: userData.role,
      newUserName: userData.name
    },
    ipAddress: 'system',
    userAgent: 'system'
  })

  return user
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  return adminUsers.get(email) || null
}

export async function getUserById(id: string): Promise<AdminUser | null> {
  for (const user of adminUsers.values()) {
    if (user.id === id) {
      return user
    }
  }
  return null
}

export async function updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
  const user = await getUserById(id)
  if (!user) {
    return null
  }

  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date()
  }

  adminUsers.set(user.email, updatedUser)
  return updatedUser
}

export async function getAllUsers(): Promise<AdminUser[]> {
  return Array.from(adminUsers.values())
}

export async function deleteUser(id: string, deletedBy: string): Promise<boolean> {
  const user = await getUserById(id)
  if (!user) {
    return false
  }

  adminUsers.delete(user.email)

  await logAuditEvent({
    userId: deletedBy,
    action: 'ADMIN_USER_DELETED',
    details: { 
      deletedUserEmail: user.email,
      deletedUserRole: user.role,
      deletedUserName: user.name
    },
    ipAddress: 'system',
    userAgent: 'system'
  })

  return true
}

// Password Management using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const salt = generateRandomString(32)
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return salt + ':' + hashHex
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, hashedPassword] = hash.split(':')
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex === hashedPassword
}

// Token Management using Web Crypto API
export function generateToken(): string {
  return generateRandomString(64)
}

export function generateId(): string {
  return generateRandomString(32)
}

// Generate random string using Web Crypto API
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => chars[byte % chars.length]).join('')
}

// Password Reset Functions
export async function createPasswordResetToken(email: string): Promise<string | null> {
  const user = await getUserByEmail(email)
  if (!user || !user.isActive) {
    return null
  }

  const resetToken = generateToken()
  const expiry = new Date()
  expiry.setHours(expiry.getHours() + 1) // 1 hour expiry

  await updateUser(user.id, {
    passwordResetToken: resetToken,
    passwordResetExpiry: expiry
  })

  await logAuditEvent({
    userId: user.id,
    action: 'PASSWORD_RESET_REQUESTED',
    details: { email },
    ipAddress: 'system',
    userAgent: 'system'
  })

  return resetToken
}

export async function verifyPasswordResetToken(token: string): Promise<AdminUser | null> {
  for (const user of adminUsers.values()) {
    if (user.passwordResetToken === token && 
        user.passwordResetExpiry && 
        user.passwordResetExpiry > new Date()) {
      return user
    }
  }
  return null
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const user = await verifyPasswordResetToken(token)
  if (!user) {
    return false
  }

  const passwordHash = await hashPassword(newPassword)
  
  await updateUser(user.id, {
    passwordHash,
    passwordResetToken: undefined,
    passwordResetExpiry: undefined,
    loginAttempts: 0,
    lockedUntil: undefined
  })

  await logAuditEvent({
    userId: user.id,
    action: 'PASSWORD_RESET_COMPLETED',
    details: { email: user.email },
    ipAddress: 'system',
    userAgent: 'system'
  })

  return true
}

// Email Verification
export async function verifyEmail(token: string): Promise<boolean> {
  for (const user of adminUsers.values()) {
    if (user.emailVerificationToken === token) {
      await updateUser(user.id, {
        isEmailVerified: true,
        emailVerificationToken: undefined
      })

      await logAuditEvent({
        userId: user.id,
        action: 'EMAIL_VERIFIED',
        details: { email: user.email },
        ipAddress: 'system',
        userAgent: 'system'
      })

      return true
    }
  }
  return false
}

// Login Attempt Management
export async function recordLoginAttempt(email: string, success: boolean, ipAddress: string, userAgent: string): Promise<void> {
  const attempt: LoginAttempt = {
    id: generateId(),
    email,
    ipAddress,
    success,
    timestamp: new Date(),
    userAgent
  }

  loginAttempts.push(attempt)

  // Update user login attempts if failed
  if (!success) {
    const user = await getUserByEmail(email)
    if (user) {
      const newAttempts = user.loginAttempts + 1
      const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5')
      
      let updates: Partial<AdminUser> = {
        loginAttempts: newAttempts
      }

      // Lock account if max attempts reached
      if (newAttempts >= maxAttempts) {
        const lockoutDuration = parseInt(process.env.LOCKOUT_DURATION?.replace('m', '') || '15')
        const lockedUntil = new Date()
        lockedUntil.setMinutes(lockedUntil.getMinutes() + lockoutDuration)
        
        updates.lockedUntil = lockedUntil
      }

      await updateUser(user.id, updates)
    }
  } else {
    // Reset login attempts on successful login
    const user = await getUserByEmail(email)
    if (user) {
      await updateUser(user.id, {
        loginAttempts: 0,
        lockedUntil: undefined,
        lastLogin: new Date()
      })
    }
  }
}

// Audit Logging
export async function logAuditEvent(event: {
  userId?: string
  action: string
  details: any
  ipAddress: string
  userAgent: string
}): Promise<void> {
  const auditLog: AuditLog = {
    id: generateId(),
    ...event,
    timestamp: new Date()
  }

  auditLogs.push(auditLog)
  
  // Keep only last 1000 audit logs in memory
  if (auditLogs.length > 1000) {
    auditLogs.splice(0, auditLogs.length - 1000)
  }

  console.log(`[AUDIT] ${auditLog.timestamp.toISOString()} - ${auditLog.action}:`, auditLog.details)
}

export async function getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
  return auditLogs.slice(-limit).reverse()
}

export async function getLoginAttempts(limit: number = 100): Promise<LoginAttempt[]> {
  return loginAttempts.slice(-limit).reverse()
}

// Initialize database on module load
initializeDatabase().catch(console.error)
