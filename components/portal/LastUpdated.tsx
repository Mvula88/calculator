'use client'

import { Clock, CheckCircle } from 'lucide-react'

interface LastUpdatedProps {
  date: string // Format: "October 2025" or "2025-10-09"
  note?: string
}

export default function LastUpdated({ date, note }: LastUpdatedProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs">
      <CheckCircle className="h-3 w-3 text-green-600" />
      <span className="text-green-800 font-medium">
        Last verified: {date}
      </span>
      {note && (
        <span className="text-green-600">• {note}</span>
      )}
    </div>
  )
}
