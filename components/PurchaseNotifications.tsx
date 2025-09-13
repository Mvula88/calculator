'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface PurchaseNotificationsProps {
  country: string
}

export default function PurchaseNotifications({ country }: PurchaseNotificationsProps) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [currentNotification, setCurrentNotification] = useState<any>(null)

  const purchases = {
    na: [
      { name: 'Johannes M.', location: 'Windhoek', package: 'Import Mastery', saved: 'N$3,000', time: '2 minutes ago' },
      { name: 'Sarah K.', location: 'Swakopmund', package: 'Import Mastery', saved: 'N$3,000', time: '5 minutes ago' },
      { name: 'David N.', location: 'Walvis Bay', package: 'Mistake Guide', saved: 'N$2,000', time: '8 minutes ago' },
      { name: 'Maria S.', location: 'Oshakati', package: 'Import Mastery', saved: 'N$3,000', time: '12 minutes ago' },
      { name: 'Peter L.', location: 'Rundu', package: 'Import Mastery', saved: 'N$3,000', time: '15 minutes ago' },
      { name: 'Anna T.', location: 'Katima Mulilo', package: 'Mistake Guide', saved: 'N$2,000', time: '18 minutes ago' },
      { name: 'Michael R.', location: 'Otjiwarongo', package: 'Import Mastery', saved: 'N$3,000', time: '22 minutes ago' }
    ],
    za: [
      { name: 'Thabo M.', location: 'Johannesburg', package: 'Import Mastery', saved: 'R3,000', time: '3 minutes ago' },
      { name: 'Priya N.', location: 'Cape Town', package: 'Import Mastery', saved: 'R3,000', time: '7 minutes ago' },
      { name: 'Johan V.', location: 'Durban', package: 'Mistake Guide', saved: 'R2,000', time: '10 minutes ago' },
      { name: 'Lerato K.', location: 'Pretoria', package: 'Import Mastery', saved: 'R3,000', time: '14 minutes ago' },
      { name: 'Ahmed S.', location: 'Port Elizabeth', package: 'Import Mastery', saved: 'R3,000', time: '17 minutes ago' }
    ],
    bw: [
      { name: 'Kagiso M.', location: 'Gaborone', package: 'Import Mastery', saved: 'P2,427', time: '4 minutes ago' },
      { name: 'Mpho K.', location: 'Francistown', package: 'Import Mastery', saved: 'P2,427', time: '9 minutes ago' },
      { name: 'Tebogo N.', location: 'Maun', package: 'Mistake Guide', saved: 'P1,616', time: '13 minutes ago' },
      { name: 'Kgosi L.', location: 'Kasane', package: 'Import Mastery', saved: 'P2,427', time: '16 minutes ago' }
    ],
    zm: [
      { name: 'Mwamba C.', location: 'Lusaka', package: 'Import Mastery', saved: 'K3,000', time: '5 minutes ago' },
      { name: 'Chanda M.', location: 'Kitwe', package: 'Import Mastery', saved: 'K3,000', time: '11 minutes ago' },
      { name: 'Mutale K.', location: 'Ndola', package: 'Mistake Guide', saved: 'K2,000', time: '15 minutes ago' },
      { name: 'Bwalya N.', location: 'Livingstone', package: 'Import Mastery', saved: 'K3,000', time: '19 minutes ago' }
    ]
  }

  const countryPurchases = purchases[country as keyof typeof purchases] || purchases.na

  useEffect(() => {
    // Show first notification after 10 seconds
    const firstTimer = setTimeout(() => {
      showNotification(0)
    }, 10000)

    return () => clearTimeout(firstTimer)
  }, [])

  const showNotification = (index: number) => {
    const purchase = countryPurchases[index % countryPurchases.length]
    setCurrentNotification(purchase)

    // Hide after 5 seconds
    setTimeout(() => {
      setCurrentNotification(null)
      
      // Show next notification after random delay (20-40 seconds)
      const nextDelay = Math.random() * 20000 + 20000
      setTimeout(() => {
        showNotification(index + 1)
      }, nextDelay)
    }, 5000)
  }

  const handleClose = () => {
    setCurrentNotification(null)
  }

  if (!currentNotification) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slideInLeft">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 pr-10 max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          
          <div className="flex-1">
            <p className="font-bold text-sm">
              {currentNotification.name} from {currentNotification.location}
            </p>
            <p className="text-sm text-gray-600">
              Just purchased <span className="font-semibold">{currentNotification.package}</span>
            </p>
            <p className="text-xs text-green-600 font-bold mt-1">
              Saved {currentNotification.saved}!
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {currentNotification.time}
            </p>
          </div>
        </div>
        
        {/* Progress bar showing activity */}
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-progressBar" />
        </div>
      </div>
    </div>
  )
}