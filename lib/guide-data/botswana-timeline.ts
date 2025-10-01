// Botswana specific import timeline via Walvis Bay

export const botswanaTimelineSteps = [
  {
    title: 'Pre-Import Planning',
    duration: '7–14 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Verify vehicle age eligibility for Botswana',
      'Get VIN and engine number photographs from seller',
      'Confirm consignee details for Bill of Lading',
      'Choose clearing approach: DIY + clearing firm vs full agent',
      'Understand Walvis Bay to Botswana border requirements'
    ],
    tips: [
      '🔍 Botswana has strict age limits - verify before purchase',
      '🧾 Invoice must show: VIN, engine number, make/model, year, capacity',
      '🎯 Walvis Bay is the primary port for Botswana imports',
      '💡 Consider using Namibian clearing agent familiar with BW process'
    ],
    commonDelays: [
      {
        delay: 'Wrong vehicle age calculation',
        cost: 'Total loss of vehicle',
        prevention: 'Check manufacturing date, not registration date'
      },
      {
        delay: 'Border documentation issues',
        cost: 'P2,000+/day delays',
        prevention: 'Prepare all docs in advance with copies'
      }
    ],
    checklist: [
      { label: 'VIN photo', id: 'vin-photo' },
      { label: 'Engine photo', id: 'engine-photo' },
      { label: 'Correct invoice', id: 'invoice' },
      { label: 'Consignee confirmed', id: 'consignee' }
    ]
  },
  {
    title: 'Documentation Preparation',
    duration: '3–5 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Namibian SAD 500 form (for Walvis Bay clearance)',
      'Botswana import permit (if required for vehicle type)',
      'BURS (Botswana Unified Revenue Service) customs declaration',
      'Original invoice and Bill of Lading',
      'ID and proof of residence in Botswana'
    ],
    tips: [
      '⚡ Clear through Walvis Bay first, then Botswana border',
      '📋 Keep copies of all Namibian clearance docs for BW customs',
      '💰 Calculate duties: Botswana customs + VAT on landed value'
    ],
    commonDelays: [
      {
        delay: 'Missing import permit',
        cost: 'P1,500+/day storage',
        prevention: 'Check if your vehicle type requires permit'
      },
      {
        delay: 'Document discrepancies',
        cost: 'P1,000+/day delays',
        prevention: 'Ensure all docs match exactly'
      }
    ],
    checklist: [
      { label: 'SAD 500 prepared', id: 'sad-500' },
      { label: 'BW import permit', id: 'bw-permit' },
      { label: 'BURS docs ready', id: 'burs' }
    ]
  },
  {
    title: 'Shipping & Arrival at Walvis Bay',
    duration: '35–45 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Track container to Walvis Bay',
      'Engage Namibian clearing agent',
      'Prepare for Namibian customs clearance',
      'Arrange transport to Botswana border'
    ],
    tips: [
      '🚢 Walvis Bay is efficient port with good facilities',
      '📅 Plan 3-5 days for Walvis Bay clearance',
      '🚚 Book cross-border transport in advance'
    ],
    commonDelays: [
      {
        delay: 'Port congestion',
        cost: 'P500+/day storage',
        prevention: 'Monitor shipping and plan for delays'
      }
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Agent engaged', id: 'agent' },
      { label: 'Transport arranged', id: 'transport' }
    ]
  },
  {
    title: 'Walvis Bay Clearance',
    duration: '3–7 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Clear through Namibian customs',
      'Pay Namibian port and handling fees',
      'Get vehicle released from port',
      'Prepare for border crossing to Botswana'
    ],
    tips: [
      '💡 Use experienced clearing agent for Walvis Bay',
      '⚡ Process faster if all docs ready in advance',
      '🔐 Keep all clearance documents for BW border'
    ],
    commonDelays: [
      {
        delay: 'Documentation errors',
        cost: 'P1,000+/day delays',
        prevention: 'Triple-check all paperwork'
      }
    ],
    checklist: [
      { label: 'Cleared customs', id: 'customs' },
      { label: 'Fees paid', id: 'fees' },
      { label: 'Vehicle released', id: 'released' }
    ]
  },
  {
    title: 'Border Crossing & Botswana Customs',
    duration: '2–5 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Cross Namibia-Botswana border',
      'Submit to BURS customs',
      'Pay Botswana import duties and VAT',
      'Get BURS release documentation',
      'Arrange transport to final destination'
    ],
    tips: [
      '🚛 Common borders: Trans-Kalahari or Mamuno',
      '📋 Have all Walvis Bay clearance docs ready',
      '💰 BURS requires payment before release',
      '⚡ Process can be same-day if docs complete'
    ],
    commonDelays: [
      {
        delay: 'Border documentation issues',
        cost: 'P2,000+ delays',
        prevention: 'Organize all docs with Namibian clearance proof'
      },
      {
        delay: 'BURS payment delays',
        cost: 'P1,500+ storage',
        prevention: 'Have payment ready, verify clearing'
      }
    ],
    checklist: [
      { label: 'Border crossed', id: 'border' },
      { label: 'BURS duties paid', id: 'burs-paid' },
      { label: 'Release obtained', id: 'release' }
    ]
  },
  {
    title: 'Registration in Botswana',
    duration: '7–14 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Police clearance certificate',
      'Roadworthy certificate',
      'BURS customs clearance certificate',
      'Registration at Department of Road Transport and Safety',
      'License plates and registration papers'
    ],
    tips: [
      '🛠️ Book roadworthy test immediately after arrival',
      '📝 Police clearance: bring all original docs',
      '🎯 DRTS registration usually 3-7 days if docs complete'
    ],
    commonDelays: [
      {
        delay: 'Roadworthy test backlogs',
        cost: 'P2,000+ delays',
        prevention: 'Book appointment ASAP'
      },
      {
        delay: 'Police clearance delays',
        cost: 'P1,000+ delays',
        prevention: 'Submit complete application early'
      }
    ],
    checklist: [
      { label: 'Police clearance', id: 'police' },
      { label: 'Roadworthy cert', id: 'roadworthy' },
      { label: 'DRTS registration', id: 'drts' },
      { label: 'Plates fitted', id: 'plates' }
    ]
  }
]
