// Namibia specific import timeline via Walvis Bay

export const namibiaTimelineSteps = [
  {
    title: 'Pre-Import Planning',
    duration: '7–14 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Pick a car that meets import rules (max 12 years old for Namibia)',
      'Get seller to photograph VIN and engine number on the car',
      'Confirm who will appear as Consignee on Bill of Lading',
      'Choose clearing approach: DIY + clearing firm (recommended) vs full agent'
    ],
    tips: [
      '🔍 Match everything to VIN/engine number. One wrong character = days of delay',
      '🧾 Invoice must show: VIN, engine number, make/model, year, engine capacity, color',
      '🎯 If sharing container, agree in writing who pays if someone drops out'
    ],
    commonDelays: [
      {
        delay: 'Wrong vehicle age calculation',
        cost: 'Total loss of vehicle',
        prevention: 'Check manufacturing date, not registration date'
      },
      {
        delay: 'Consignee account blocked',
        cost: 'N$500+/day storage',
        prevention: 'Verify consignee good standing before purchase'
      }
    ],
    checklist: [
      { label: 'VIN photo', id: 'vin-photo' },
      { label: 'Engine photo', id: 'engine-photo' },
      { label: 'Correct invoice', id: 'invoice' },
      { label: 'Consignee confirmed', id: 'consignee' },
      { label: 'Clearing plan', id: 'clearing' }
    ]
  },
  {
    title: 'Documentation Preparation',
    duration: '3–5 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'SAD 500 form (clearing firm prepares)',
      'Assessment Notice (official duty/VAT computation)',
      'Payment Receipts for all duties and levies',
      'Customs Release Order and Clearance Certificate',
      'Police Clearance for VIN/engine verification',
      'ID and Driver\'s License copies'
    ],
    tips: [
      '⚡ Complete SAD 500 immediately when Bill of Lading arrives',
      '📋 Triple-check VIN/engine numbers before submission',
      '💰 Keep all payment receipts - you need them for registration'
    ],
    commonDelays: [
      {
        delay: 'Missing certified translation',
        cost: 'N$300+/day storage',
        prevention: 'Start translation process 2-3 weeks early'
      },
      {
        delay: 'VIN/Engine number errors',
        cost: 'N$2,500+ delays',
        prevention: 'Triple-check all numbers against photos'
      }
    ],
    checklist: [
      { label: 'SAD 500 form', id: 'sad-500' },
      { label: 'All receipts', id: 'receipts' },
      { label: 'ID documents', id: 'id-docs' },
      { label: 'Vehicle photos', id: 'photos' }
    ]
  },
  {
    title: 'Shipping & Arrival',
    duration: '35–45 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Track container location weekly',
      'Prepare clearing agent documents',
      'Arrange port storage if needed',
      'Book transporter in advance'
    ],
    tips: [
      '🚢 Container arrives 2-3 days before scheduled date usually',
      '📅 Book clearing agent 1 week before arrival',
      '🚚 Pre-book transporter to avoid storage fees'
    ],
    commonDelays: [
      {
        delay: 'Port congestion',
        cost: 'N$200+/day extra storage',
        prevention: 'Monitor port status and plan for delays'
      }
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Agent booked', id: 'agent' },
      { label: 'Transport ready', id: 'transport' }
    ]
  },
  {
    title: 'Clearance & Collection',
    duration: '5–10 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Submit documents to clearing agent',
      'Pay all duties and fees',
      'Pass police clearance inspection',
      'Arrange collection from port'
    ],
    tips: [
      '💡 Use clearing firm for first import - DIY is risky',
      '⏰ Start clearance immediately to avoid storage fees',
      '🔐 Get temporary insurance before driving'
    ],
    commonDelays: [
      {
        delay: 'HS code disputes',
        cost: 'N$15,000+ extra duty',
        prevention: 'Research correct classification beforehand'
      },
      {
        delay: 'Payment processing delays',
        cost: 'N$500+/day storage',
        prevention: 'Have all payment methods ready and verified'
      }
    ],
    checklist: [
      { label: 'Duties paid', id: 'duties' },
      { label: 'Police cleared', id: 'police' },
      { label: 'Car collected', id: 'collected' }
    ]
  },
  {
    title: 'Registration',
    duration: '7–14 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Roadworthy certificate',
      'NaTIS registration',
      'License plates',
      'Insurance policy'
    ],
    tips: [
      '🛠️ Book roadworthy test immediately after collection',
      '📝 Submit NaTIS papers same day as roadworthy',
      '🎯 Full process can be done in 3 days if organized'
    ],
    commonDelays: [
      {
        delay: 'Roadworthy test backlogs',
        cost: 'N$1,500+ delays',
        prevention: 'Book appointment immediately after collection'
      }
    ],
    checklist: [
      { label: 'Roadworthy', id: 'roadworthy' },
      { label: 'NaTIS done', id: 'natis' },
      { label: 'Plates fitted', id: 'plates' },
      { label: 'Insurance active', id: 'insurance' }
    ]
  }
]
