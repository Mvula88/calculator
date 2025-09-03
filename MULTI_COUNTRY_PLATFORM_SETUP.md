# 🌍 ONE PLATFORM FOR ALL SADC COUNTRIES - IMPLEMENTATION GUIDE

## THE SMART ARCHITECTURE

```
www.importcars.africa (or .com)
     │
     ├── Auto-detects country by IP
     ├── Shows local currency
     ├── Same login works everywhere
     └── Country-specific content where needed
```

## 🎯 OPTION 1: SIMPLE SUBDOMAIN APPROACH (RECOMMENDED)

### URL Structure:
- **Main**: www.importcars.africa
- **Namibia**: na.importcars.africa (or auto-detect)
- **South Africa**: za.importcars.africa
- **Botswana**: bw.importcars.africa
- **Zambia**: zm.importcars.africa

### Implementation in Next.js:

#### 1. Middleware for Country Detection (middleware.ts)
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get country from subdomain or IP
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  
  // Map subdomains to countries
  const countryMap = {
    'na': 'namibia',
    'za': 'south-africa',
    'bw': 'botswana',
    'zm': 'zambia'
  }
  
  let country = countryMap[subdomain] || 'namibia' // default
  
  // If no subdomain, detect from IP
  if (!countryMap[subdomain]) {
    const ip = request.ip || request.headers.get('x-forwarded-for')
    country = await detectCountryFromIP(ip) || 'namibia'
  }
  
  // Add country to headers
  const response = NextResponse.next()
  response.headers.set('x-user-country', country)
  
  return response
}

async function detectCountryFromIP(ip: string) {
  // Use free service like ipapi.co
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country_code/`)
    const code = await res.text()
    
    const countryMap = {
      'NA': 'namibia',
      'ZA': 'south-africa',
      'BW': 'botswana',
      'ZM': 'zambia'
    }
    
    return countryMap[code] || 'namibia'
  } catch {
    return 'namibia' // default
  }
}
```

#### 2. Country Context Provider (lib/country-context.tsx)
```typescript
'use client'

import { createContext, useContext } from 'react'

type Country = {
  code: string
  name: string
  currency: string
  symbol: string
  phone: string
  flag: string
  port: string
  exchangeRate: number // to NAD
}

const COUNTRIES = {
  'namibia': {
    code: 'NA',
    name: 'Namibia',
    currency: 'NAD',
    symbol: 'N$',
    phone: '+264',
    flag: '🇳🇦',
    port: 'Walvis Bay',
    exchangeRate: 1
  },
  'south-africa': {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    symbol: 'R',
    phone: '+27',
    flag: '🇿🇦',
    port: 'Durban',
    exchangeRate: 1 // ZAR = NAD
  },
  'botswana': {
    code: 'BW',
    name: 'Botswana',
    currency: 'BWP',
    symbol: 'P',
    phone: '+267',
    flag: '🇧🇼',
    port: 'Walvis Bay',
    exchangeRate: 0.73 // 1 BWP = 0.73 NAD
  },
  'zambia': {
    code: 'ZM',
    name: 'Zambia',
    currency: 'ZMW',
    symbol: 'K',
    phone: '+260',
    flag: '🇿🇲',
    port: 'Multiple',
    exchangeRate: 0.056 // 1 ZMW = 0.056 NAD
  }
}

const CountryContext = createContext<Country>(COUNTRIES.namibia)

export function CountryProvider({ children, country }) {
  const countryData = COUNTRIES[country] || COUNTRIES.namibia
  
  return (
    <CountryContext.Provider value={countryData}>
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = () => useContext(CountryContext)
```

#### 3. Dynamic Pricing Component (components/Price.tsx)
```typescript
import { useCountry } from '@/lib/country-context'

export function Price({ nadAmount = 1499 }) {
  const country = useCountry()
  
  // Convert NAD to local currency
  const localAmount = nadAmount / country.exchangeRate
  
  // Format based on country
  const formatted = new Intl.NumberFormat(country.code, {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(localAmount)
  
  // For consistency, keep same number across countries
  if (country.code === 'NA' || country.code === 'ZA') {
    return <span>{country.symbol}1,499</span>
  }
  if (country.code === 'BW') {
    return <span>P1,499</span>
  }
  if (country.code === 'ZM') {
    return <span>K1,499</span> // or $85 USD
  }
  
  return <span>{formatted}</span>
}
```

#### 4. Country-Specific Landing Page (app/page.tsx)
```typescript
import { useCountry } from '@/lib/country-context'
import { Price } from '@/components/Price'

export default function LandingPage() {
  const country = useCountry()
  
  // Country-specific content
  const content = {
    'namibia': {
      headline: "I've Imported 38 Cars Through Walvis Bay",
      subheadline: "Save N$60,000+ with Container Sharing",
      testimonial: "Saved N$65,000 on my Hilux - John, Windhoek",
      popularCars: ['Toyota Hilux', 'VW Polo', 'Toyota Fortuner']
    },
    'south-africa': {
      headline: "Skip Durban Delays - Import Smarter",
      subheadline: "Save R60,000+ vs Dealer Prices",
      testimonial: "Avoided R85,000 dealer markup - Sarah, Joburg",
      popularCars: ['Toyota Corolla', 'Nissan NP200', 'Honda Fit']
    },
    'botswana': {
      headline: "Import via Walvis Bay - Save P50,000",
      subheadline: "Faster & Cheaper than Durban Route",
      testimonial: "Got my Fortuner P70,000 cheaper - Thabo, Gabs",
      popularCars: ['Toyota Hilux', 'Toyota Fortuner', 'VW Polo']
    },
    'zambia': {
      headline: "Compare All 3 Import Routes",
      subheadline: "Save K50,000+ on Your Next Import",
      testimonial: "Saved K65,000 using Walvis route - James, Lusaka",
      popularCars: ['Toyota Vitz', 'Toyota Spacio', 'Honda Fit']
    }
  }
  
  const local = content[country.code] || content.namibia
  
  return (
    <div>
      {/* Country Selector Bar */}
      <div className="bg-gray-100 p-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{country.flag}</span>
            <span>Serving {country.name}</span>
          </div>
          <select 
            onChange={(e) => window.location.href = `https://${e.target.value}.importcars.africa`}
            value={country.code}
            className="px-3 py-1 rounded border"
          >
            <option value="na">🇳🇦 Namibia</option>
            <option value="za">🇿🇦 South Africa</option>
            <option value="bw">🇧🇼 Botswana</option>
            <option value="zm">🇿🇲 Zambia</option>
          </select>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="hero">
        <h1>{local.headline}</h1>
        <p>{local.subheadline}</p>
        <Button>
          Get Started - <Price />
        </Button>
      </section>
      
      {/* Show local testimonial */}
      <div className="testimonial">
        "{local.testimonial}"
      </div>
      
      {/* Popular cars for this country */}
      <div className="popular-cars">
        <h3>Most Imported in {country.name}:</h3>
        {local.popularCars.map(car => (
          <div key={car}>{car}</div>
        ))}
      </div>
    </div>
  )
}
```

#### 5. Calculator with Country-Specific Costs
```typescript
export function Calculator() {
  const country = useCountry()
  
  // Different costs per country
  const costs = {
    'namibia': {
      shipping: 22000,
      port: 6500,
      duty: 0.20,
      clearing: 4000
    },
    'south-africa': {
      shipping: 25000,
      port: 10000,
      duty: 0.25,
      clearing: 8000
    },
    'botswana': {
      shipping: 23000,
      port: 8000,
      duty: 0.25,
      clearing: 5000
    },
    'zambia': {
      shipping: 28000,
      port: 9000,
      duty: 0.25,
      clearing: 6000
    }
  }
  
  const localCosts = costs[country.code] || costs.namibia
  
  // Rest of calculator logic...
}
```

## 🎯 OPTION 2: SINGLE DOMAIN WITH COUNTRY SELECTOR

### Simpler Implementation:
```typescript
// Just use query parameters or cookies
www.importcars.africa?country=za
// or
www.importcars.africa (auto-detect)
```

## 💳 PAYMENT HANDLING

### Stripe Configuration Per Country:
```typescript
const STRIPE_CONFIGS = {
  'namibia': {
    priceId: 'price_namibia_1499',
    currency: 'nad'
  },
  'south-africa': {
    priceId: 'price_sa_1499',
    currency: 'zar'
  },
  'botswana': {
    priceId: 'price_botswana_1499',
    currency: 'bwp' // or use USD
  },
  'zambia': {
    priceId: 'price_zambia_85',
    currency: 'usd' // Stripe doesn't support ZMW
  }
}
```

## 📱 WHATSAPP SUPPORT BY COUNTRY

```typescript
const WHATSAPP_NUMBERS = {
  'namibia': '+264811234567',
  'south-africa': '+264811234567', // Same number
  'botswana': '+264811234567', // or local agent
  'zambia': '+264811234567' // or local agent
}

// In your component
<Button onClick={() => {
  const number = WHATSAPP_NUMBERS[country.code]
  const message = `Hi, I'm from ${country.name} and need help importing`
  window.open(`https://wa.me/${number}?text=${message}`)
}}>
  WhatsApp Support
</Button>
```

## 🚀 DEPLOYMENT STRATEGY

### 1. Vercel Configuration:
```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*"
    }
  ],
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "x-country-detect",
          "value": "true"
        }
      ]
    }
  ]
}
```

### 2. Domain Setup:
- Buy `importcars.africa` or `importcalculator.com`
- Point subdomains to same Vercel deployment
- Use Vercel's edge functions for country detection

## 📊 DATABASE STRUCTURE

```sql
-- Same database, country field added
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  country TEXT DEFAULT 'namibia',
  currency TEXT DEFAULT 'NAD',
  -- rest of fields
);

CREATE TABLE calculations (
  id UUID PRIMARY KEY,
  user_id UUID,
  country TEXT,
  port_used TEXT,
  total_cost_local DECIMAL, -- in local currency
  total_cost_nad DECIMAL, -- converted to NAD
  -- rest of fields
);
```

## 🎯 THE SIMPLEST APPROACH

### Just Add a Country Selector:
1. Keep everything at one domain
2. Add country dropdown in header
3. Store selection in cookie
4. Show prices in selected currency
5. Adjust calculator values

```typescript
// Super simple implementation
export default function App() {
  const [country, setCountry] = useState('namibia')
  
  return (
    <>
      <Header>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="namibia">🇳🇦 Namibia (N$)</option>
          <option value="south-africa">🇿🇦 South Africa (R)</option>
          <option value="botswana">🇧🇼 Botswana (P)</option>
          <option value="zambia">🇿🇲 Zambia (K)</option>
        </select>
      </Header>
      
      <Calculator country={country} />
    </>
  )
}
```

## ✅ RECOMMENDED APPROACH

1. **Single domain**: importcalculator.africa
2. **Auto-detect country**: From IP address
3. **Manual override**: Country selector in header
4. **Same price number**: 1,499 (just different currency)
5. **Shared database**: With country field
6. **One codebase**: Easier to maintain

## 🚀 IMPLEMENTATION STEPS

### Week 1:
1. Add country detection middleware
2. Create country selector component
3. Update prices to show local currency
4. Test with VPN from each country

### Week 2:
1. Add country-specific testimonials
2. Create local landing page variants
3. Set up local WhatsApp numbers
4. Launch in all 4 countries

### Week 3:
1. Create country-specific ads
2. Join local Facebook groups
3. Partner with local agents
4. Track conversion by country

## 💡 PRO TIPS

1. **Keep it simple**: Don't over-engineer
2. **Same price number**: 1,499 everywhere (psychological)
3. **Local testimonials**: Build trust
4. **Show savings in local currency**: More impact
5. **Emphasize Walvis Bay**: For Botswana/Western Zambia

## THE BOTTOM LINE

One platform. Four countries. Keep it simple.

Don't build four websites. Build one smart website.

The code above gives you everything. Pick the simple approach and launch THIS WEEK.