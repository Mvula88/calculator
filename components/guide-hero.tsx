import CountrySelector from '@/components/CountrySelector'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'
import { AlertTriangle } from 'lucide-react'

interface GuideHeroProps {
  country: string
  port: string
  flag: string
}

export default function GuideHero({ country, port, flag }: GuideHeroProps) {
  return (
    <>
      <CountrySelector />
      
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ImportCalc Pro</div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Trusted by 12,000+ Importers</div>
              <HeaderCountrySelector />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">{flag}</span>
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">{port} Port Import Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete {country} Car Import Guide
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Avoid costly mistakes and save thousands with battle-tested strategies from 
              real importers who've successfully cleared vehicles through {port}.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}