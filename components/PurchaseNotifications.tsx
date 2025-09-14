'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ImportSuccessNotificationsProps {
  country: string
}

export default function ImportSuccessNotifications({ country }: ImportSuccessNotificationsProps) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [currentNotification, setCurrentNotification] = useState<any>(null)

  const successStories = {
    na: [
      { name: 'Johannes M.', location: 'Windhoek', item: 'Toyota Hilux', saved: 'N$45,000', time: '2 hours ago' },
      { name: 'Sarah K.', location: 'Swakopmund', item: 'VW Polo GTI', saved: 'N$32,000', time: '5 hours ago' },
      { name: 'David N.', location: 'Walvis Bay', item: 'Ford Ranger', saved: 'N$38,000', time: '8 hours ago' },
      { name: 'Maria S.', location: 'Oshakati', item: 'Mercedes C200', saved: 'N$52,000', time: '12 hours ago' },
      { name: 'Peter L.', location: 'Rundu', item: 'BMW 320i', saved: 'N$41,000', time: '15 hours ago' },
      { name: 'Anna T.', location: 'Katima Mulilo', item: 'Toyota Corolla', saved: 'N$28,000', time: '18 hours ago' },
      { name: 'Michael R.', location: 'Otjiwarongo', item: 'Nissan NP300', saved: 'N$35,000', time: '22 hours ago' }
    ],
    za: [
      { name: 'Thabo M.', location: 'Johannesburg', item: 'Golf 7 GTI', saved: 'R45,000', time: '3 hours ago' },
      { name: 'Priya N.', location: 'Cape Town', item: 'Audi A3', saved: 'R52,000', time: '7 hours ago' },
      { name: 'Johan V.', location: 'Durban', item: 'Toyota Fortuner', saved: 'R48,000', time: '10 hours ago' },
      { name: 'Lerato K.', location: 'Pretoria', item: 'BMW X1', saved: 'R55,000', time: '14 hours ago' },
      { name: 'Ahmed S.', location: 'Port Elizabeth', item: 'Mazda CX-5', saved: 'R43,000', time: '17 hours ago' }
    ],
    bw: [
      { name: 'Kagiso M.', location: 'Gaborone', item: 'Honda Fit', saved: 'P35,000', time: '4 hours ago' },
      { name: 'Mpho K.', location: 'Francistown', item: 'Toyota RAV4', saved: 'P42,000', time: '9 hours ago' },
      { name: 'Tebogo N.', location: 'Maun', item: 'Nissan X-Trail', saved: 'P38,000', time: '13 hours ago' },
      { name: 'Kgosi L.', location: 'Kasane', item: 'VW Tiguan', saved: 'P45,000', time: '16 hours ago' }
    ],
    zm: [
      { name: 'Mwamba C.', location: 'Lusaka', item: 'Toyota Vitz', saved: 'K45,000', time: '5 hours ago' },
      { name: 'Chanda M.', location: 'Kitwe', item: 'Honda HR-V', saved: 'K52,000', time: '11 hours ago' },
      { name: 'Mutale K.', location: 'Ndola', item: 'Mazda Demio', saved: 'K38,000', time: '15 hours ago' },
      { name: 'Bwalya N.', location: 'Livingstone', item: 'Subaru XV', saved: 'K48,000', time: '19 hours ago' }
    ]
  }

  const countryStories = successStories[country as keyof typeof successStories] || successStories.na

  useEffect(() => {
    // Show first notification after 10 seconds
    const firstTimer = setTimeout(() => {
      showNotification(0)
    }, 10000)

    return () => clearTimeout(firstTimer)
  }, [])

  const showNotification = (index: number) => {
    const story = countryStories[index % countryStories.length]
    setCurrentNotification(story)

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
              Successfully imported a <span className="font-semibold">{currentNotification.item}</span>
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