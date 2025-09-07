# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email ismaelmvula@gmail.com or security@[yourdomain].com with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Do not create public GitHub issues for security vulnerabilities.**

## Security Best Practices

### Environment Variables
- Never commit `.env.local` or any files containing secrets
- Use `.env.example` as a template
- Rotate keys immediately if exposed
- Use different keys for development/staging/production

### API Security
- All payment endpoints have rate limiting (5 requests/minute)
- Webhook signatures are verified
- Idempotency keys prevent duplicate charges
- Service role keys are only used server-side

### Authentication
- Supabase handles authentication
- Magic links for passwordless login
- Session cookies are httpOnly and secure in production
- Portal access requires valid entitlement

### Database Security
- Row Level Security (RLS) enabled
- Service role bypasses RLS for admin operations
- User data is minimal and encrypted at rest
- Regular backups recommended

### Payment Security
- Stripe handles all payment processing
- No credit card data stored locally
- PCI compliance through Stripe
- Webhook endpoints verify signatures

## Security Checklist for Deployment

- [ ] All environment variables configured
- [ ] `.env.local` not in repository
- [ ] Stripe webhook secret configured
- [ ] Database migrations run
- [ ] RLS policies active
- [ ] Rate limiting enabled
- [ ] HTTPS enforced in production
- [ ] Dependencies up to date
- [ ] Error monitoring configured

## Known Security Considerations

1. **Rate Limiting**: Currently uses in-memory storage. Consider Redis for production scale.
2. **Country Detection**: IP-based detection can be spoofed but only affects UI, not pricing.
3. **Calculator Data**: Duty rates are estimates and should not be considered authoritative.

## Update Policy

- Security patches: Immediate
- Dependency updates: Weekly review
- Framework updates: Monthly review
- Breaking changes: Quarterly planning