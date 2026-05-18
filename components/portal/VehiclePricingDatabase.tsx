'use client'

import { useState } from 'react'
import { Search, AlertTriangle } from 'lucide-react'

interface VehiclePricing {
  model: string
  year: string
  engineSize: string
  priceRangeJPY: string
  priceRangeNAD?: string
  category: string
  popularity?: 'high' | 'medium' | 'low'
  notes?: string
}

const vehicleDatabase: VehiclePricing[] = [
  // Toyota
  { model: 'Toyota Vitz', year: '2013–2018', engineSize: '1.3L Auto', priceRangeJPY: '¥300,000–600,000', priceRangeNAD: 'N$36,000–72,000', category: 'Compact', popularity: 'high' },
  { model: 'Toyota Wish', year: '2013–2016', engineSize: '1.8L/2.0L', priceRangeJPY: '¥500,000–800,000', priceRangeNAD: 'N$60,000–96,000', category: 'MPV' },
  { model: 'Toyota Hilux', year: '2017+', engineSize: 'Diesel', priceRangeJPY: '¥2,500,000–3,000,000', priceRangeNAD: 'N$300,000–360,000', category: 'Pickup', notes: '2013–2016 not recommended' },
  { model: 'Toyota Passo', year: '2013–2018', engineSize: '1.0L', priceRangeJPY: '¥200,000–300,000', priceRangeNAD: 'N$24,000–36,000', category: 'Compact' },

  // Mazda
  { model: 'Mazda Demio', year: '2014–2018', engineSize: '1.3L/1.5L', priceRangeJPY: '¥200,000–300,000', priceRangeNAD: 'N$24,000–36,000', category: 'Compact', popularity: 'medium' },
  { model: 'Mazda6', year: '2019+', engineSize: '2.0L/2.5L', priceRangeJPY: '¥2,000,000+', priceRangeNAD: 'N$240,000+', category: 'Sedan', notes: '2013–2016 limited data' },
  { model: 'Mazda CX-3', year: '2014–2018', engineSize: '1.5L/2.0L', priceRangeJPY: '¥500,000–600,000', priceRangeNAD: 'N$60,000–72,000', category: 'SUV' },
  { model: 'Mazda CX-5', year: '2014–2016', engineSize: '2.0L/2.5L', priceRangeJPY: '¥300,000–400,000', priceRangeNAD: 'N$36,000–48,000', category: 'SUV', popularity: 'high' },

  // Volkswagen
  { model: 'VW Polo TSI', year: '2013–2018', engineSize: '1.2L/1.4L', priceRangeJPY: '¥400,000–600,000', priceRangeNAD: 'N$48,000–72,000', category: 'Hatchback', popularity: 'high' },
  { model: 'VW Polo GTI', year: '2013–2018', engineSize: '1.8L', priceRangeJPY: '¥600,000–1,000,000', priceRangeNAD: 'N$72,000–120,000', category: 'Sport', notes: 'Performance model' },
  { model: 'VW Golf 6', year: '2009–2012', engineSize: '1.4L TSI', priceRangeJPY: '¥200,000–400,000', priceRangeNAD: 'N$24,000–48,000', category: 'Hatchback' },
  { model: 'VW Golf 7', year: '2013–2018', engineSize: '1.4L TSI', priceRangeJPY: '¥600,000–700,000', priceRangeNAD: 'N$72,000–84,000', category: 'Hatchback', popularity: 'high' },
  { model: 'VW Golf 7 GTI', year: '2013–2018', engineSize: '2.0L TSI', priceRangeJPY: '¥1,000,000–1,400,000', priceRangeNAD: 'N$120,000–168,000', category: 'Sport', notes: 'Performance model' },
  { model: 'VW Golf 7R', year: '2013–2018', engineSize: '2.0L TSI', priceRangeJPY: '¥500,000–2,000,000+', priceRangeNAD: 'N$60,000–240,000+', category: 'Sport', notes: 'Top performance' },
  { model: 'VW Tiguan', year: '2013–2016', engineSize: '1.4L/2.0L TSI', priceRangeJPY: '¥700,000–800,000', priceRangeNAD: 'N$84,000–96,000', category: 'SUV' },

  // Audi
  { model: 'Audi A1', year: '2013–2018', engineSize: '1.4L TFSI', priceRangeJPY: '¥500,000', priceRangeNAD: 'N$60,000', category: 'Hatchback' },
  { model: 'Audi A3 Sportback', year: '2013–2017', engineSize: '1.4L/1.8L TFSI', priceRangeJPY: '¥500,000–700,000', priceRangeNAD: 'N$60,000–84,000', category: 'Hatchback', popularity: 'high' },
  { model: 'Audi A4 B8/B9', year: '2013–2018', engineSize: '1.8L/2.0L TFSI', priceRangeJPY: '¥200,000–750,000', priceRangeNAD: 'N$24,000–90,000', category: 'Sedan', popularity: 'high' },
  { model: 'Audi A5', year: '2013–2016', engineSize: '2.0L TFSI', priceRangeJPY: '¥300,000+', priceRangeNAD: 'N$36,000+', category: 'Coupe', notes: 'Limited auction history' },
  { model: 'Audi A6', year: '2013–2016', engineSize: '2.0L/3.0L TFSI', priceRangeJPY: '¥400,000–600,000', priceRangeNAD: 'N$48,000–72,000', category: 'Sedan' },
  { model: 'Audi Q3', year: '2013–2016', engineSize: '1.4L/2.0L TFSI', priceRangeJPY: '¥500,000–600,000', priceRangeNAD: 'N$60,000–72,000', category: 'SUV' },
  { model: 'Audi Q5', year: '2013–2018', engineSize: '2.0L TFSI', priceRangeJPY: '¥800,000–1,500,000', priceRangeNAD: 'N$96,000–180,000', category: 'SUV', popularity: 'high' },

  // BMW
  { model: 'BMW 1 Series', year: '2013–2016', engineSize: '116i/118i', priceRangeJPY: '¥300,000–400,000', priceRangeNAD: 'N$36,000–48,000', category: 'Hatchback' },
  { model: 'BMW 3 Series F30', year: '2013–2016', engineSize: '320i/328i', priceRangeJPY: '¥400,000–600,000', priceRangeNAD: 'N$48,000–72,000', category: 'Sedan', popularity: 'high' },
  { model: 'BMW 4 Series', year: '2013–2016', engineSize: '420i/428i', priceRangeJPY: '¥600,000–800,000', priceRangeNAD: 'N$72,000–96,000', category: 'Coupe' },
  { model: 'BMW 5 Series', year: '2013–2016', engineSize: '520i/528i', priceRangeJPY: '¥500,000–600,000', priceRangeNAD: 'N$60,000–72,000', category: 'Sedan' },
  { model: 'BMW 6 Series', year: '2013–2016', engineSize: '640i/650i', priceRangeJPY: '¥700,000+', priceRangeNAD: 'N$84,000+', category: 'Coupe', notes: 'Luxury model' },
  { model: 'BMW 7 Series', year: '2013–2017', engineSize: '740i/750i', priceRangeJPY: '¥500,000–1,400,000', priceRangeNAD: 'N$60,000–168,000', category: 'Sedan', notes: 'Luxury flagship' },
  { model: 'BMW X1', year: '2013–2017', engineSize: 'sDrive18i/20i', priceRangeJPY: '¥300,000–800,000', priceRangeNAD: 'N$36,000–96,000', category: 'SUV' },
  { model: 'BMW X3', year: '2013–2016', engineSize: 'xDrive20i/28i', priceRangeJPY: '¥400,000–800,000', priceRangeNAD: 'N$48,000–96,000', category: 'SUV', popularity: 'high' },
  { model: 'BMW X5', year: '2013–2017', engineSize: 'xDrive35i/50i', priceRangeJPY: '¥1,500,000+', priceRangeNAD: 'N$180,000+', category: 'SUV', notes: 'Premium SUV' },

  // Mercedes-Benz
  { model: 'Mercedes A-Class', year: '2013–2016', engineSize: 'A180/A200', priceRangeJPY: '¥400,000', priceRangeNAD: 'N$48,000', category: 'Hatchback' },
  { model: 'Mercedes C-Class', year: '2013–2016', engineSize: 'C180/C200', priceRangeJPY: '¥600,000–900,000', priceRangeNAD: 'N$72,000–108,000', category: 'Sedan', popularity: 'high' },
  { model: 'Mercedes E-Class', year: '2013–2016', engineSize: 'E250/E350', priceRangeJPY: '¥700,000–1,300,000', priceRangeNAD: 'N$84,000–156,000', category: 'Sedan' },
  { model: 'Mercedes B-Class', year: '2013–2016', engineSize: 'B180/B200', priceRangeJPY: '¥200,000–300,000', priceRangeNAD: 'N$24,000–36,000', category: 'MPV' },
  { model: 'Mercedes C63 AMG', year: '2013–2017', engineSize: '6.2L V8', priceRangeJPY: '¥4,000,000+', priceRangeNAD: 'N$480,000+', category: 'Sport', notes: 'High performance AMG' },

  // Honda
  { model: 'Honda Fit', year: '2013–2018', engineSize: '1.3L/1.5L', priceRangeJPY: '¥250,000–400,000', priceRangeNAD: 'N$30,000–48,000', category: 'Compact', popularity: 'high' },

  // Nissan
  { model: 'Nissan Note', year: '2013–2018', engineSize: '1.2L', priceRangeJPY: '¥150,000–300,000', priceRangeNAD: 'N$18,000–36,000', category: 'Compact' },
]

function popularityLabel(popularity?: VehiclePricing['popularity']) {
  if (popularity === 'high') return 'Popular'
  if (popularity === 'medium') return 'Good choice'
  return null
}

export default function VehiclePricingDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'price' | 'model'>('model')

  const categories = ['all', ...Array.from(new Set(vehicleDatabase.map((v) => v.category)))]

  const filteredVehicles = vehicleDatabase
    .filter((vehicle) => {
      const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        const aPrice = parseInt(a.priceRangeJPY.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0')
        const bPrice = parseInt(b.priceRangeJPY.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0')
        return aPrice - bPrice
      }
      return a.model.localeCompare(b.model)
    })

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 02</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Auction price database</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Japanese auction prices.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Real auction price ranges from expert Japanese exporters. <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 ml-2">Updated December 2024</span>
      </p>

      {/* Important notice */}
      <div className="mt-8 border-l-2 border-amber-500 pl-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} />
          Auction price only
        </p>
        <p className="text-sm text-zinc-700 leading-relaxed">
          Add ¥120,000–150,000 for FOB costs, plus N$70,000–165,000 for shipping, duties, clearing, and local charges to get total landed cost. Exchange rate: <span className="font-mono text-zinc-900">¥1 ≈ N$0.12</span>
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search vehicle model…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-11 pr-4 text-sm bg-white border border-zinc-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-11 px-4 text-sm bg-white border border-zinc-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All categories' : cat}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'model')}
          className="h-11 px-4 text-sm bg-white border border-zinc-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
        >
          <option value="model">Sort by model</option>
          <option value="price">Sort by price</option>
        </select>
      </div>

      {/* Pricing table */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-stone-50/60">
                <th className="text-left py-3 px-4 sm:px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">Model</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold hidden sm:table-cell">Year</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold hidden md:table-cell">Engine</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold hidden lg:table-cell">Category</th>
                <th className="text-right py-3 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">JPY</th>
                <th className="text-right py-3 px-4 sm:px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">NAD</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => {
                const popLabel = popularityLabel(vehicle.popularity)
                return (
                  <tr
                    key={index}
                    className="border-b border-zinc-100 last:border-b-0 hover:bg-stone-50/60 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <p className="text-sm font-medium text-zinc-900">{vehicle.model}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em]">
                        <span className="sm:hidden text-zinc-500">{vehicle.year}</span>
                        <span className="lg:hidden text-zinc-500">{vehicle.category}</span>
                        {popLabel && (
                          <span className={vehicle.popularity === 'high' ? 'text-amber-700 font-semibold' : 'text-zinc-700 font-semibold'}>
                            {popLabel}
                          </span>
                        )}
                        {vehicle.notes && (
                          <span className="italic text-zinc-500 normal-case tracking-normal font-sans text-xs">
                            {vehicle.notes}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-zinc-600 hidden sm:table-cell">{vehicle.year}</td>
                    <td className="py-4 px-4 text-sm text-zinc-600 hidden md:table-cell">{vehicle.engineSize}</td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                        {vehicle.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-sm text-zinc-900 whitespace-nowrap">
                      {vehicle.priceRangeJPY}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-sm font-medium text-amber-700 whitespace-nowrap">
                      {vehicle.priceRangeNAD || 'Calculate'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-zinc-600">No vehicles match your search.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 hover:text-amber-900 underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Footnotes */}
      <dl className="mt-8 border-t border-zinc-200 divide-y divide-zinc-100">
        <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pt-0.5">FOB</dt>
          <dd className="text-sm text-zinc-700 leading-relaxed">
            FOB (Free On Board) = Auction price + ¥120,000–150,000 (depending on auction location). Total landed cost includes FOB + shipping + duties + clearing.
          </dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pt-0.5">Source</dt>
          <dd className="text-sm text-zinc-700 leading-relaxed">
            Direct from Japanese export agents with current market data (December 2024).
          </dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pt-0.5">Exchange rate</dt>
          <dd className="text-sm text-zinc-700 leading-relaxed">
            <span className="font-mono">¥1 ≈ N$0.12</span> — approximate. Check current rates before bidding.
          </dd>
        </div>
      </dl>
    </div>
  )
}
