// Zambia specific import timeline via Walvis Bay

export const zambiaTimelineSteps = [
  {
    title: 'Pre-Import Planning',
    duration: '7–14 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Verify vehicle age eligibility for Zambia (typically 5 years)',
      'Get VIN and engine number photographs from seller',
      'Confirm consignee details for Bill of Lading',
      'Understand Walvis Bay to Zambia route (via Namibia/Botswana)',
      'Choose clearing approach: agent recommended for first import'
    ],
    tips: [
      '🔍 Zambia has strict 5-year age limit - manufacturing date critical',
      '🧾 Invoice requirements: VIN, engine, make, model, year, capacity',
      '🎯 Walvis Bay route more reliable than Dar es Salaam',
      '💡 Consider fuel-efficient vehicles - Zambia fuel costs high'
    ],
    commonDelays: [
      {
        delay: 'Wrong vehicle age calculation',
        cost: 'Total loss - vehicle rejected',
        prevention: 'Verify manufacturing date before purchase'
      },
      {
        delay: 'Multi-border crossing issues',
        cost: 'K5,000+/day delays',
        prevention: 'Use experienced agent for cross-border process'
      }
    ],
    checklist: [
      { label: 'Age verified (≤5 years)', id: 'age-check' },
      { label: 'VIN/Engine photos', id: 'photos' },
      { label: 'Invoice correct', id: 'invoice' },
      { label: 'Agent selected', id: 'agent' }
    ]
  },
  {
    title: 'Documentation Preparation',
    duration: '5–7 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Zambia import permit (from ZRA - Zambia Revenue Authority)',
      'Namibian SAD 500 for Walvis Bay clearance',
      'Original commercial invoice',
      'Bill of Lading',
      'Zambian ID/NRC and TPN (Tax Payer Number)',
      'Transit documents for Namibia/Botswana passage'
    ],
    tips: [
      '⚡ ZRA import permit required before shipping - apply early',
      '📋 Ensure invoice value realistic - ZRA will verify',
      '💰 Budget for duties: ~30% customs + 16% VAT',
      '🔐 Register with ZRA if not already registered'
    ],
    commonDelays: [
      {
        delay: 'ZRA import permit delays',
        cost: 'K3,000+/day storage',
        prevention: 'Apply for permit 2-3 weeks before shipping'
      },
      {
        delay: 'Transit document issues',
        cost: 'K2,000+/day at border',
        prevention: 'Use agent familiar with multi-country transit'
      }
    ],
    checklist: [
      { label: 'ZRA import permit', id: 'zra-permit' },
      { label: 'SAD 500 prepared', id: 'sad-500' },
      { label: 'Transit docs ready', id: 'transit' },
      { label: 'TPN registered', id: 'tpn' }
    ]
  },
  {
    title: 'Shipping & Walvis Bay Arrival',
    duration: '35–50 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Track container to Walvis Bay port',
      'Engage clearing agent for Walvis Bay',
      'Prepare cross-border transport arrangement',
      'Coordinate multi-country transit clearances'
    ],
    tips: [
      '🚢 Walvis Bay to Zambia: ~1,500km overland journey',
      '📅 Plan for 5-7 days transit after Walvis Bay clearance',
      '🚚 Route: Walvis Bay → Namibia → Botswana → Zambia',
      '💡 Some agents handle entire door-to-door service'
    ],
    commonDelays: [
      {
        delay: 'Port delays at Walvis Bay',
        cost: 'K1,000+/day storage',
        prevention: 'Monitor shipping schedule closely'
      }
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Agent engaged', id: 'agent' },
      { label: 'Transit arranged', id: 'transit' }
    ]
  },
  {
    title: 'Walvis Bay Clearance & Transit',
    duration: '5–10 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Clear Namibian customs at Walvis Bay',
      'Pay Namibian port fees',
      'Obtain transit documents for Namibia/Botswana',
      'Arrange bonded transport to Zambia',
      'Track vehicle through transit countries'
    ],
    tips: [
      '💡 Transit bond required for passage through Namibia/Botswana',
      '⚡ Agent should handle all transit paperwork',
      '🔐 Keep tracking vehicle location during transit',
      '📋 Have copies of all docs at each border'
    ],
    commonDelays: [
      {
        delay: 'Border crossing delays',
        cost: 'K2,500+/day transit delays',
        prevention: 'Use experienced cross-border transport company'
      },
      {
        delay: 'Transit bond issues',
        cost: 'K3,000+ border delays',
        prevention: 'Ensure agent arranges bonds in advance'
      }
    ],
    checklist: [
      { label: 'Walvis Bay cleared', id: 'walvis-cleared' },
      { label: 'Transit bonds ready', id: 'bonds' },
      { label: 'Vehicle in transit', id: 'in-transit' }
    ]
  },
  {
    title: 'Zambia Border Entry & ZRA Clearance',
    duration: '3–7 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Enter Zambia at border (common: Kazungula)',
      'Submit to ZRA customs clearance',
      'Pay import duties (~30%) and VAT (16%)',
      'Pay ZRA processing fees',
      'Obtain ZRA release certificate',
      'Clear vehicle from customs holding'
    ],
    tips: [
      '💰 ZRA duties calculated on CIF value + shipping costs',
      '⚡ Have ZRA import permit ready - mandatory',
      '📋 Payment must clear before release - plan for bank delays',
      '🔐 Keep all ZRA receipts - needed for registration'
    ],
    commonDelays: [
      {
        delay: 'ZRA valuation disputes',
        cost: 'K10,000+ additional duties',
        prevention: 'Use realistic market values with supporting docs'
      },
      {
        delay: 'Missing import permit',
        cost: 'K5,000+/day storage + penalties',
        prevention: 'Have ZRA permit ready before vehicle arrives'
      },
      {
        delay: 'Payment processing delays',
        cost: 'K2,000+/day storage',
        prevention: 'Process payment immediately, confirm clearing'
      }
    ],
    checklist: [
      { label: 'Border crossed', id: 'border' },
      { label: 'ZRA duties paid', id: 'zra-paid' },
      { label: 'Release certificate', id: 'release' },
      { label: 'Vehicle cleared', id: 'cleared' }
    ]
  },
  {
    title: 'Registration & Licensing (RTSA)',
    duration: '7–21 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'RTSA (Road Transport and Safety Agency) inspection',
      'Police clearance certificate',
      'Certificate of fitness (roadworthy)',
      'ZRA customs clearance certificate',
      'Registration with RTSA',
      'License plates and vehicle registration book'
    ],
    tips: [
      '🛠️ RTSA inspection required for all imports',
      '📝 Book inspection appointment early - can have backlogs',
      '🎯 Certificate of fitness: vehicle must pass roadworthy standards',
      '💡 Police clearance: verify VIN, usually same day',
      '⚠️ RTSA registration can take 7-14 days'
    ],
    commonDelays: [
      {
        delay: 'RTSA inspection backlogs',
        cost: 'K3,000+ productivity loss',
        prevention: 'Book appointment immediately upon arrival'
      },
      {
        delay: 'Certificate of fitness failures',
        cost: 'K5,000-K15,000 for repairs',
        prevention: 'Buy vehicles in good condition'
      },
      {
        delay: 'RTSA processing delays',
        cost: 'K2,000+ time delays',
        prevention: 'Submit complete application, follow up regularly'
      }
    ],
    checklist: [
      { label: 'RTSA inspection passed', id: 'rtsa-inspection' },
      { label: 'Police clearance', id: 'police' },
      { label: 'Certificate of fitness', id: 'fitness' },
      { label: 'RTSA registration', id: 'rtsa-reg' },
      { label: 'License plates', id: 'plates' }
    ]
  }
]
