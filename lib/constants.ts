// Centralized configuration for contact information
export const CONTACT_INFO = {
  // UPDATE THIS WITH YOUR REAL WHATSAPP NUMBER
  whatsapp: {
    number: '+264813214813', // Replace with your real WhatsApp number
    displayNumber: '+264 81 321 4813', // Formatted for display
    shortDisplay: '+264 81 XXX XXXX', // For privacy in public displays
  },
  email: 'support@importcalc.africa',
  address: 'Windhoek, Namibia',
  
  // You can add more contact methods here
  phone: {
    primary: '+264813214813',
    secondary: null,
  },
  
  socialMedia: {
    facebook: null,
    instagram: null,
    linkedin: null,
  }
}

// Country-specific support numbers (if different)
export const COUNTRY_SUPPORT = {
  'NA': CONTACT_INFO.whatsapp.number, // Namibia
  'ZA': CONTACT_INFO.whatsapp.number, // South Africa
  'BW': CONTACT_INFO.whatsapp.number, // Botswana
  'ZM': CONTACT_INFO.whatsapp.number, // Zambia
}

// Business hours (optional)
export const BUSINESS_HOURS = {
  timezone: 'Africa/Windhoek',
  days: 'Monday - Saturday',
  hours: '08:00 - 18:00 CAT',
  closedOn: 'Sundays and Public Holidays',
}