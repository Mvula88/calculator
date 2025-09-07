# Import Calculator Pro

A professional car import duty calculator for Southern African countries (Namibia, South Africa, Botswana, and Zambia). This platform helps users estimate import duties and costs for Japanese car imports.

## Features

- **Country-Specific Calculations**: Automatic country detection with specific duty rates for NA, ZA, BW, and ZM
- **Professional Duty Calculator**: Comprehensive cost breakdown including duties, VAT, and all fees
- **Tiered Access System**: Free guides and premium calculator access
- **Secure Payment Processing**: Stripe integration with webhook handling
- **User Authentication**: Supabase Auth with magic link support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Monitoring**: Sentry

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- (Optional) Sentry account for error tracking

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calculator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with actual values:
   - Supabase credentials (URL, Anon Key, Service Role Key)
   - Stripe keys (Publishable, Secret, Webhook Secret)
   - App URL for production

5. Run database migrations in Supabase:
```sql
-- Run the migration from supabase/migrations/001_create_entitlements_table.sql
```

6. Set up Stripe products:
   - Create products for each country/tier combination
   - Add the price IDs to your `.env.local`

7. Configure Stripe webhook:
   - Point to: `https://your-domain.com/api/stripe/webhook`
   - Listen for: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Testing

```bash
# Run Playwright tests
npm test

# Run tests with UI
npm run test:ui
```

### Deployment

1. Deploy to Vercel:
```bash
vercel deploy
```

2. Set environment variables in Vercel dashboard

3. Update Stripe webhook URL to production domain

4. Run database migrations in production Supabase

## Security Considerations

- **Never commit `.env.local` files**
- **Rotate keys regularly**
- **Use webhook signature verification**
- **Implement rate limiting on payment endpoints**
- **Keep dependencies updated**

## Important Notes

### Calculator Accuracy
- Duty rates are estimates based on publicly available information
- Always consult with qualified clearing agents for final calculations
- Customs authorities may adjust declared values

### Payment Processing
- Stripe handles all payment processing
- Webhook endpoints verify signatures for security
- Idempotency keys prevent duplicate charges
- Rate limiting protects against abuse

## Project Structure

```
calculator/
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── portal/          # Protected portal pages
│   └── [country]/       # Country-specific pages
├── components/          # React components
├── lib/                 # Utility functions
├── supabase/           # Database migrations
└── public/             # Static assets
```

## License

Proprietary - All rights reserved

## Support

For issues or questions, please contact support.