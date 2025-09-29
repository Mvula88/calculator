import { createServiceClient } from '@/lib/supabase/server'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Email templates
export const emailTemplates = {
  welcome: (email: string, tier: string) => ({
    subject: 'Welcome to IMPOTA - Your Import Calculator Access',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Welcome to IMPOTA!
        </h1>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for purchasing the <strong>${tier === 'mastery' ? 'Import Mastery' : 'Mistake Guide'}</strong> package!
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0;">What's Next?</h2>
          <ol style="color: #555; line-height: 1.8;">
            <li>Check your email for a verification code</li>
            <li>Visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/setup-account">Setup Your Account</a></li>
            <li>Create a secure password</li>
            <li>Access your import calculator immediately</li>
          </ol>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <p style="color: #92400e; margin: 0;">
            <strong>Important:</strong> Keep this email for your records. Your access is tied to this email address: ${email}
          </p>
        </div>

        <p style="color: #555; font-size: 14px; margin-top: 30px;">
          Need help? Reply to this email or contact support@impota.com
        </p>

        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © 2024 IMPOTA. All rights reserved.<br>
            Import Calculator for Southern Africa
          </p>
        </div>
      </div>
    `,
    text: `
Welcome to IMPOTA!

Thank you for purchasing the ${tier === 'mastery' ? 'Import Mastery' : 'Mistake Guide'} package!

What's Next?
1. Check your email for a verification code
2. Visit ${process.env.NEXT_PUBLIC_APP_URL}/auth/setup-account to set up your account
3. Create a secure password
4. Access your import calculator immediately

Important: Keep this email for your records. Your access is tied to this email address: ${email}

Need help? Reply to this email or contact support@impota.com

© 2024 IMPOTA. All rights reserved.
    `.trim()
  }),

  purchaseConfirmation: (email: string, tier: string, amount: number, currency: string) => ({
    subject: 'Payment Confirmed - IMPOTA Import Calculator',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
          Payment Confirmed ✓
        </h1>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Your payment has been successfully processed!
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0;">Order Details</h2>
          <table style="width: 100%; color: #555;">
            <tr>
              <td style="padding: 8px 0;"><strong>Package:</strong></td>
              <td>${tier === 'mastery' ? 'Import Mastery' : 'Mistake Guide'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Amount:</strong></td>
              <td>${currency} ${(amount / 100).toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Date:</strong></td>
              <td>${new Date().toLocaleDateString()}</td>
            </tr>
          </table>
        </div>

        <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #065f46; margin-top: 0;">Ready to Start?</h3>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/setup-account" 
             style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
            Set Up Your Account →
          </a>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          <strong>What you get with ${tier === 'mastery' ? 'Import Mastery' : 'Mistake Guide'}:</strong>
        </p>
        <ul style="color: #555; font-size: 14px; line-height: 1.8;">
          ${tier === 'mastery' ? `
            <li>Complete import duty calculator</li>
            <li>Live exchange rates</li>
            <li>Verified clearing agent directory</li>
            <li>Japan auction bidding guide</li>
            <li>Container sharing network access</li>
            <li>WhatsApp priority support</li>
            <li>Video tutorials & walkthroughs</li>
          ` : `
            <li>55-page import playbook</li>
            <li>Port navigation guides</li>
            <li>Real cost breakdowns</li>
            <li>Documentation templates</li>
            <li>Scam prevention checklist</li>
            <li>Lifetime updates</li>
          `}
        </ul>

        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            This is your official receipt. Please keep it for your records.<br>
            © 2024 IMPOTA. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
Payment Confirmed ✓

Your payment has been successfully processed!

Order Details:
- Package: ${tier === 'mastery' ? 'Import Mastery' : 'Mistake Guide'}
- Amount: ${currency} ${(amount / 100).toFixed(2)}
- Email: ${email}
- Date: ${new Date().toLocaleDateString()}

Ready to Start?
Set up your account at: ${process.env.NEXT_PUBLIC_APP_URL}/auth/setup-account

This is your official receipt. Please keep it for your records.

© 2024 IMPOTA. All rights reserved.
    `.trim()
  }),

  passwordReset: (email: string, resetLink: string) => ({
    subject: 'Reset Your IMPOTA Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Password Reset Request
        </h1>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          We received a request to reset your password for ${email}.
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="color: #555; margin-bottom: 20px;">
            Click the button below to reset your password:
          </p>
          <a href="${resetLink}" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reset Password
          </a>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            This link expires in 1 hour
          </p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>

        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © 2024 IMPOTA. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
Password Reset Request

We received a request to reset your password for ${email}.

Reset your password here: ${resetLink}

This link expires in 1 hour.

If you didn't request this password reset, you can safely ignore this email.

© 2024 IMPOTA. All rights reserved.
    `.trim()
  })
}

// Send email using Supabase Edge Functions (if configured) or fallback
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const supabase = createServiceClient()

    // Check if Supabase Edge Function is configured for email
    if (process.env.SUPABASE_EMAIL_FUNCTION_URL) {
      const response = await fetch(process.env.SUPABASE_EMAIL_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify(options)
      })

      if (response.ok) {

        return true
      }
    }

    // Fallback: Log email (in production, integrate with SendGrid, Resend, etc.)

    // Store email log in database
    await supabase.from('email_logs').insert({
      to: options.to,
      subject: options.subject,
      sent_at: new Date().toISOString(),
      status: 'pending' // In production, this would be 'sent'
    })

    return true
  } catch (error) {

    return false
  }
}

// Helper function to send welcome email
export async function sendWelcomeEmail(email: string, tier: 'mistake' | 'mastery') {
  const template = emailTemplates.welcome(email, tier)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

// Helper function to send purchase confirmation
export async function sendPurchaseConfirmation(
  email: string, 
  tier: 'mistake' | 'mastery',
  amount: number,
  currency: string
) {
  const template = emailTemplates.purchaseConfirmation(email, tier, amount, currency)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

// Helper function to send password reset email
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const template = emailTemplates.passwordReset(email, resetLink)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}