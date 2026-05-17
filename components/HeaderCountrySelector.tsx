'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const countries = [
  { code: 'na', name: 'Namibia', flag: '🇳🇦', currency: '$12 USD' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', currency: '$12 USD' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼', currency: '$12 USD' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲', currency: '$12 USD' },
]

interface HeaderCountrySelectorProps {
  country?: string
}

export default function HeaderCountrySelector({ country }: HeaderCountrySelectorProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCountry, setCurrentCountry] = useState<string>(country || 'na')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/')
    const countryCode = pathSegments[1]
    if (['na', 'za', 'bw', 'zm'].includes(countryCode)) {
      setCurrentCountry(countryCode)
    } else {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('user-country='))
      if (cookie) {
        const country = cookie.split('=')[1]
        const validCountry = countries.find(
          (c) => country.includes(c.name.toLowerCase()) || country.includes(c.code)
        )
        if (validCountry) setCurrentCountry(validCountry.code)
      }
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCountryChange = (countryCode: string) => {
    document.cookie = `user-country=${countryCode}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`
    window.location.href = `/${countryCode}/guide`
  }

  const current = countries.find((c) => c.code === currentCountry) || countries[0]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Pill button — flag + code + chevron */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 rounded-full border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
        aria-label={`Select country, current: ${current.name}`}
      >
        <span className="text-base sm:text-lg leading-none">{current.flag}</span>
        <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700 font-semibold">
          {current.code}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.75}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
              Select country
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              04
            </span>
          </div>

          {/* Country list */}
          <div className="py-1">
            {countries.map((c) => {
              const isActive = currentCountry === c.code
              return (
                <button
                  key={c.code}
                  onClick={() => handleCountryChange(c.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-amber-50/60'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <span className="text-xl leading-none flex-shrink-0">{c.flag}</span>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium text-zinc-900">{c.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mt-0.5">
                      {c.currency}
                    </div>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" aria-hidden />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  )
}
