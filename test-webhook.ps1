# PowerShell script to test Stripe webhook locally
# Make sure you have Stripe CLI installed

Write-Host "Starting Stripe webhook listener..." -ForegroundColor Green
Write-Host "Make sure your dev server is running on port 3003" -ForegroundColor Yellow

# Forward webhooks to your local server
stripe listen --forward-to localhost:3003/api/stripe/webhook

# This will give you a temporary webhook secret for local testing
# Update your .env.local with the temporary secret it provides