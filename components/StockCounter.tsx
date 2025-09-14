'use client'

import { useState, useEffect } from 'react'
import { Users, TrendingDown } from 'lucide-react'

interface StockCounterProps {
  initialStock?: number
  country: string
}

export default function StockCounter({ initialStock = 23, country }: StockCounterProps) {
  const [stock, setStock] = useState(initialStock)
  const [viewingNow, setViewingNow] = useState(7)

  useEffect(() => {
    // Get stored stock from localStorage or use initial
    const storedStock = localStorage.getItem(`stock_${country}`)
    const storedTime = localStorage.getItem(`stock_time_${country}`)
    
    if (storedStock && storedTime) {
      const timeDiff = Date.now() - parseInt(storedTime)
      const hoursPassed = timeDiff / (1000 * 60 * 60)
      
      // Decrease stock by 1 every 2 hours
      const decrease = Math.floor(hoursPassed / 2)
      const newStock = Math.max(3, parseInt(storedStock) - decrease) // Never go below 3
      setStock(newStock)
    }
    
    // Save current stock and time
    localStorage.setItem(`stock_${country}`, stock.toString())
    localStorage.setItem(`stock_time_${country}`, Date.now().toString())
    
    // Randomly decrease stock every 5-10 minutes while user is on page
    const interval = setInterval(() => {
      setStock(prev => {
        const newStock = Math.max(3, prev - 1)
        localStorage.setItem(`stock_${country}`, newStock.toString())
        return newStock
      })
    }, Math.random() * 300000 + 300000) // 5-10 minutes
    
    // Randomly change viewing now number
    const viewingInterval = setInterval(() => {
      setViewingNow(Math.floor(Math.random() * 6) + 5) // 5-10 people
    }, 30000) // Every 30 seconds
    
    return () => {
      clearInterval(interval)
      clearInterval(viewingInterval)
    }
  }, [country])

  const getStockColor = () => {
    if (stock <= 5) return 'text-red-600 bg-red-50'
    if (stock <= 10) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  return null // Component disabled - removes fake scarcity tactics
}