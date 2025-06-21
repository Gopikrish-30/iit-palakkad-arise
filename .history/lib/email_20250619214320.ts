// Simplified email system for development (no external dependencies)
// In production, replace this with a proper email service like SendGrid, AWS SES, etc.

interface EmailConfig {
  service?: string
  host?: string
  port?: number
  secure?: boolean
  auth: {
    user: string
    pass: string
  }
}

// Mock email transporter for development
function createTransporter() {
  return {
    sendMail: async (options: any) => {
      // Log email content to console for development
      console.log('\n=== EMAIL SENT (DEVELOPMENT MODE) ===')
      console.log('To:', options.to)
      console.log('Subject:', options.subject)
      console.log('HTML Content:')
      console.log(options.html)
      console.log('=====================================\n')

      return {
        messageId: `dev-${Date.now()}@localhost`,
        accepted: [options.to],
        rejected: []
      }
    },
    verify: async () => {
      console.log('Email configuration verified (development mode)')
      return true
    }
  }
}

// Email templates
const getEmailTemplate = (type: 'password-reset' | 'email-verification' | 'account-created', data: any) => {
  const appName = process.env.APP_NAME || 'IIT Palakkad Admin'
  const appUrl = process.env.APP_URL || 'http://localhost:3000'

  switch (type) {
    case 'password-reset':
      return {
        subject: `${appName} - Password Reset Request`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
              .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${appName}</h1>
              <p>Password Reset Request</p>
            </div>
            <div class="content">
              <h2>Hello ${data.name},</h2>
              <p>We received a request to reset your password for your ${appName} account.</p>
              
              <p>Click the button below to reset your password:</p>
              <a href="${appUrl}/admin/reset-password?token=${data.token}" class="button">Reset Password</a>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px;">
                ${appUrl}/admin/reset-password?token=${data.token}
              </p>
              
              <div class="warning">
                <strong>Security Notice:</strong>
                <ul>
                  <li>This link will expire in 1 hour</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Never share this link with anyone</li>
                </ul>
              </div>
              
              <p>If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
            </div>
            <div class="footer">
              <p>This email was sent from ${appName}. If you didn't request this password reset, please contact your administrator.</p>
              <p>© ${new Date().getFullYear()} IIT Palakkad. All rights reserved.</p>
            </div>
          </body>
          </html>
        `
      }

    case 'email-verification':
      return {
        subject: `${appName} - Verify Your Email Address`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${appName}</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Welcome ${data.name}!</h2>
              <p>Thank you for joining ${appName}. To complete your account setup, please verify your email address.</p>
              
              <p>Click the button below to verify your email:</p>
              <a href="${appUrl}/admin/verify-email?token=${data.token}" class="button">Verify Email</a>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px;">
                ${appUrl}/admin/verify-email?token=${data.token}
              </p>
              
              <p><strong>Account Details:</strong></p>
              <ul>
                <li>Email: ${data.email}</li>
                <li>Role: ${data.role}</li>
                <li>Created: ${new Date().toLocaleDateString()}</li>
              </ul>
              
              <p>This verification link will expire in 24 hours.</p>
            </div>
            <div class="footer">
              <p>If you didn't create this account, please contact your administrator immediately.</p>
              <p>© ${new Date().getFullYear()} IIT Palakkad. All rights reserved.</p>
            </div>
          </body>
          </html>
        `
      }

    case 'account-created':
      return {
        subject: `${appName} - Your Admin Account Has Been Created`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Created</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
              .credentials { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${appName}</h1>
              <p>Admin Account Created</p>
            </div>
            <div class="content">
              <h2>Hello ${data.name},</h2>
              <p>Your admin account for ${appName} has been successfully created!</p>
              
              <div class="credentials">
                <strong>Your Account Details:</strong>
                <ul>
                  <li><strong>Email:</strong> ${data.email}</li>
                  <li><strong>Role:</strong> ${data.role}</li>
                  <li><strong>Temporary Password:</strong> ${data.tempPassword}</li>
                </ul>
              </div>
              
              <p>For security reasons, please:</p>
              <ol>
                <li>Click the button below to verify your email</li>
                <li>Login with your temporary password</li>
                <li>Change your password immediately</li>
              </ol>
              
              <a href="${appUrl}/admin/verify-email?token=${data.token}" class="button">Verify Email & Login</a>
              
              <p><strong>Important Security Notes:</strong></p>
              <ul>
                <li>Change your temporary password on first login</li>
                <li>Enable two-factor authentication for enhanced security</li>
                <li>Never share your login credentials</li>
              </ul>
            </div>
            <div class="footer">
              <p>If you have any questions, please contact your administrator.</p>
              <p>© ${new Date().getFullYear()} IIT Palakkad. All rights reserved.</p>
            </div>
          </body>
          </html>
        `
      }

    default:
      throw new Error(`Unknown email template type: ${type}`)
  }
}

// Send email function (development version)
export async function sendEmail(
  to: string,
  type: 'password-reset' | 'email-verification' | 'account-created',
  data: any
): Promise<boolean> {
  try {
    const transporter = createTransporter()
    const template = getEmailTemplate(type, data)
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'admin@iitpkd.ac.in'

    const mailOptions = {
      from: `"${process.env.APP_NAME || 'IIT Palakkad Admin'}" <${fromEmail}>`,
      to,
      subject: template.subject,
      html: template.html
    }

    const result = await transporter.sendMail(mailOptions)
    console.log(`Email sent successfully to ${to}:`, result.messageId)
    return true

  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Specific email functions
export async function sendPasswordResetEmail(email: string, name: string, token: string): Promise<boolean> {
  return sendEmail(email, 'password-reset', { name, token })
}

export async function sendEmailVerificationEmail(email: string, name: string, role: string, token: string): Promise<boolean> {
  return sendEmail(email, 'email-verification', { name, email, role, token })
}

export async function sendAccountCreatedEmail(
  email: string, 
  name: string, 
  role: string, 
  tempPassword: string, 
  token: string
): Promise<boolean> {
  return sendEmail(email, 'account-created', { name, email, role, tempPassword, token })
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('Email configuration is valid')
    return true
  } catch (error) {
    console.error('Email configuration test failed:', error)
    return false
  }
}
