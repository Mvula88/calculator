// South Africa specific import timeline
// Based on SARS, ITAC, and NRCS requirements

export const southAfricaTimelineSteps = [
  {
    title: 'Pre-Import Planning & ITAC Permit',
    duration: '14–21 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Apply for ITAC import permit (required for SA)',
      'Verify vehicle meets NRCS homologation requirements',
      'Confirm vehicle age eligibility (check latest SA regulations)',
      'Get VIN and engine number photographs from seller',
      'Choose port: Walvis Bay (recommended) or Durban',
      'Decide: DIY + customs broker vs full agent service'
    ],
    tips: [
      '📋 ITAC permit takes 10-14 days - start early!',
      '🔍 NRCS approval is critical - non-compliant vehicles will be rejected',
      '🧾 Invoice must match ITAC application exactly',
      '⚠️ Some vehicles require Letter of Authority from manufacturer',
      '🎯 Walvis Bay often faster/cheaper than Durban for clearance'
    ],
    commonDelays: [
      {
        delay: 'ITAC permit delays or rejection',
        cost: 'R5,000+ in fees and delays',
        prevention: 'Submit complete application with all supporting documents'
      },
      {
        delay: 'NRCS homologation issues',
        cost: 'Vehicle may be unsellable in SA',
        prevention: 'Verify model is approved before purchasing'
      },
      {
        delay: 'Incorrect vehicle valuation',
        cost: 'R10,000+ additional duties',
        prevention: 'Use accurate market value, not invoice value'
      }
    ],
    checklist: [
      { label: 'ITAC permit applied', id: 'itac-permit' },
      { label: 'NRCS compliance verified', id: 'nrcs' },
      { label: 'VIN/Engine photos', id: 'photos' },
      { label: 'Port decided', id: 'port' },
      { label: 'Clearing method chosen', id: 'clearing' }
    ]
  },
  {
    title: 'Documentation & SARS Preparation',
    duration: '5–7 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'ITAC permit (original required)',
      'Bill of Entry (DA 500) - customs broker prepares',
      'Original commercial invoice',
      'Bill of Lading or Airway Bill',
      'Packing list',
      'SARS customs declaration',
      'ID document and proof of residence'
    ],
    tips: [
      '⚡ Keep ITAC permit original safe - you need it for customs',
      '📋 All documents must have matching VIN/engine numbers',
      '💰 Calculate duties: 25% ad valorem + 15% VAT on landed cost',
      '🔐 Register for SARS eFiling if doing DIY clearance'
    ],
    commonDelays: [
      {
        delay: 'Missing ITAC permit original',
        cost: 'R1,000+/day storage fees',
        prevention: 'Never send ITAC original to anyone - keep it secure'
      },
      {
        delay: 'Invoice/BL discrepancies',
        cost: 'R500+/day delays',
        prevention: 'Triple-check all document numbers match exactly'
      },
      {
        delay: 'Incorrect HS code classification',
        cost: 'R20,000+ extra duties',
        prevention: 'Use experienced customs broker for classification'
      }
    ],
    checklist: [
      { label: 'ITAC permit original', id: 'itac-original' },
      { label: 'Bill of Entry (DA 500)', id: 'da-500' },
      { label: 'All shipping docs', id: 'shipping-docs' },
      { label: 'SARS registration', id: 'sars-reg' }
    ]
  },
  {
    title: 'Shipping & Arrival',
    duration: '35–50 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Track container shipping progress',
      'Engage customs broker 2 weeks before arrival',
      'Prepare all clearance documents',
      'Arrange transport from port',
      'Organize temporary storage if needed'
    ],
    tips: [
      '🚢 Walvis Bay to SA border: +3-5 days transport time',
      '📅 Durban port often has 7-14 day backlogs',
      '🚚 Book transporter early - especially for Durban',
      '💡 Consider port storage costs in budget'
    ],
    commonDelays: [
      {
        delay: 'Durban port congestion',
        cost: 'R800+/day storage fees',
        prevention: 'Use Walvis Bay or plan for delays'
      },
      {
        delay: 'SARS physical inspection',
        cost: 'R500+/day extra storage',
        prevention: 'Have all documents ready for inspection'
      }
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Broker engaged', id: 'broker' },
      { label: 'Transport booked', id: 'transport' }
    ]
  },
  {
    title: 'Customs Clearance (SARS)',
    duration: '3–10 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Submit Bill of Entry (DA 500) to SARS',
      'Pay import duties (25% + 15% VAT)',
      'Pay SARS processing fees',
      'Obtain Release Notice from SARS',
      'Clear port authority fees',
      'Arrange physical vehicle inspection if required'
    ],
    tips: [
      '💰 Budget R8,000-R15,000 for R100k vehicle (duties + VAT + fees)',
      '⚡ Use SARS eFiling for faster processing',
      '🔐 Payment must clear before release - plan for bank delays',
      '📋 Keep all SARS receipts - needed for registration'
    ],
    commonDelays: [
      {
        delay: 'SARS valuation disputes',
        cost: 'R15,000+ additional duties',
        prevention: 'Use realistic market values, provide supporting docs'
      },
      {
        delay: 'Payment processing delays',
        cost: 'R800+/day storage',
        prevention: 'Pay via EFT early, confirm clearance before collection'
      },
      {
        delay: 'Physical inspection delays',
        cost: 'R500+/day extra time',
        prevention: 'Respond immediately to inspection requests'
      }
    ],
    checklist: [
      { label: 'DA 500 submitted', id: 'da-500-submit' },
      { label: 'Duties paid', id: 'duties-paid' },
      { label: 'SARS release obtained', id: 'sars-release' },
      { label: 'Port fees cleared', id: 'port-fees' }
    ]
  },
  {
    title: 'Collection & Transport to SA',
    duration: '2–5 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Collect vehicle from port (or Walvis Bay)',
      'Arrange cross-border transport if using Walvis Bay',
      'Complete SA border crossing formalities',
      'Get temporary insurance for transport',
      'Transport to your location in SA'
    ],
    tips: [
      '🚚 Walvis Bay to SA border crossing usually smooth',
      '🔐 Keep all customs docs in vehicle during transport',
      '📋 SA border requires: SARS release, ITAC permit, Bill of Entry',
      '⚠️ Arrange insurance before driving - it\'s required'
    ],
    commonDelays: [
      {
        delay: 'Border crossing document issues',
        cost: 'R2,000+ delays',
        prevention: 'Have all docs organized and copies ready'
      },
      {
        delay: 'Transport availability',
        cost: 'R1,000+/day storage',
        prevention: 'Book transport company 1-2 weeks in advance'
      }
    ],
    checklist: [
      { label: 'Vehicle collected', id: 'collected' },
      { label: 'Border crossed', id: 'border' },
      { label: 'Insurance active', id: 'insurance' },
      { label: 'Vehicle in SA', id: 'in-sa' }
    ]
  },
  {
    title: 'Roadworthy & Registration (eNaTIS)',
    duration: '7–21 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Roadworthy certificate (valid 60 days)',
      'eNaTIS registration application',
      'Police clearance certificate',
      'SARS customs clearance certificate',
      'ITAC permit original',
      'Proof of ownership (invoice + Bill of Entry)',
      'License plates and registration papers'
    ],
    tips: [
      '🛠️ Book roadworthy test ASAP - testing stations have backlogs',
      '📝 eNaTIS can take 5-14 days depending on region',
      '🎯 Police clearance: book appointment, bring all docs',
      '💡 Some testing stations book 2-3 weeks out - call ahead',
      '⚠️ Roadworthy fails common for imports - budget for repairs'
    ],
    commonDelays: [
      {
        delay: 'Roadworthy test backlogs',
        cost: 'R3,000+ delays and lost productivity',
        prevention: 'Book appointment immediately after arrival'
      },
      {
        delay: 'Roadworthy test failures',
        cost: 'R5,000-R20,000 for repairs',
        prevention: 'Inspect vehicle condition before purchase'
      },
      {
        delay: 'eNaTIS processing delays',
        cost: 'R2,000+ time delays',
        prevention: 'Submit complete application, follow up regularly'
      },
      {
        delay: 'Police clearance delays',
        cost: 'R1,500+ delays',
        prevention: 'Book appointment early, bring all original docs'
      }
    ],
    checklist: [
      { label: 'Roadworthy certificate', id: 'roadworthy' },
      { label: 'Police clearance', id: 'police-clear' },
      { label: 'eNaTIS submitted', id: 'enatis' },
      { label: 'License plates', id: 'plates' },
      { label: 'Registration complete', id: 'registration' }
    ]
  }
]
