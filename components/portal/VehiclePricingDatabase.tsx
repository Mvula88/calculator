'use client'

import { useState } from 'react'
import { Search, TrendingUp, AlertCircle, DollarSign } from 'lucide-react'

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
  { model: 'Toyota Vitz', year: '2013-2018', engineSize: '1.3L Auto', priceRangeJPY: '¥300,000-600,000', priceRangeNAD: 'N$39,000-78,000', category: 'Compact', popularity: 'high' },
  { model: 'Toyota Wish', year: '2013-2016', engineSize: '1.8L/2.0L', priceRangeJPY: '¥500,000-800,000', priceRangeNAD: 'N$65,000-104,000', category: 'MPV' },
  { model: 'Toyota Hilux', year: '2017+', engineSize: 'Diesel', priceRangeJPY: '¥2,500,000-3,000,000', priceRangeNAD: 'N$325,000-390,000', category: 'Pickup', notes: '2013-2016 not recommended' },
  { model: 'Toyota Passo', year: '2013-2018', engineSize: '1.0L', priceRangeJPY: '¥200,000-300,000', priceRangeNAD: 'N$26,000-39,000', category: 'Compact' },

  // Mazda
  { model: 'Mazda Demio', year: '2014-2018', engineSize: '1.3L/1.5L', priceRangeJPY: '¥200,000-300,000', priceRangeNAD: 'N$26,000-39,000', category: 'Compact', popularity: 'medium' },
  { model: 'Mazda6', year: '2019+', engineSize: '2.0L/2.5L', priceRangeJPY: '¥2,000,000+', priceRangeNAD: 'N$260,000+', category: 'Sedan', notes: '2013-2016 limited data' },
  { model: 'Mazda CX-3', year: '2014-2018', engineSize: '1.5L/2.0L', priceRangeJPY: '¥500,000-600,000', priceRangeNAD: 'N$65,000-78,000', category: 'SUV' },
  { model: 'Mazda CX-5', year: '2014-2016', engineSize: '2.0L/2.5L', priceRangeJPY: '¥300,000-400,000', priceRangeNAD: 'N$39,000-52,000', category: 'SUV', popularity: 'high' },

  // Volkswagen
  { model: 'VW Polo TSI', year: '2013-2018', engineSize: '1.2L/1.4L', priceRangeJPY: '¥400,000-600,000', priceRangeNAD: 'N$52,000-78,000', category: 'Hatchback', popularity: 'high' },
  { model: 'VW Polo GTI', year: '2013-2018', engineSize: '1.8L', priceRangeJPY: '¥600,000-1,000,000', priceRangeNAD: 'N$78,000-130,000', category: 'Sport', notes: 'Performance model' },
  { model: 'VW Golf 6', year: '2009-2012', engineSize: '1.4L TSI', priceRangeJPY: '¥200,000-400,000', priceRangeNAD: 'N$26,000-52,000', category: 'Hatchback' },
  { model: 'VW Golf 7', year: '2013-2018', engineSize: '1.4L TSI', priceRangeJPY: '¥600,000-700,000', priceRangeNAD: 'N$78,000-91,000', category: 'Hatchback', popularity: 'high' },
  { model: 'VW Golf 7 GTI', year: '2013-2018', engineSize: '2.0L TSI', priceRangeJPY: '¥1,000,000-1,400,000', priceRangeNAD: 'N$130,000-182,000', category: 'Sport', notes: 'Performance model' },
  { model: 'VW Golf 7R', year: '2013-2018', engineSize: '2.0L TSI', priceRangeJPY: '¥1,300,000-2,000,000+', priceRangeNAD: 'N$169,000-260,000+', category: 'Sport', notes: 'Top performance' },
  { model: 'VW Tiguan', year: '2013-2016', engineSize: '1.4L/2.0L TSI', priceRangeJPY: '¥700,000-800,000', priceRangeNAD: 'N$91,000-104,000', category: 'SUV' },

  // Audi
  { model: 'Audi A1', year: '2013-2018', engineSize: '1.4L TFSI', priceRangeJPY: '¥500,000', priceRangeNAD: 'N$65,000', category: 'Hatchback' },
  { model: 'Audi A3 Sportback', year: '2013-2017', engineSize: '1.4L/1.8L TFSI', priceRangeJPY: '¥500,000-700,000', priceRangeNAD: 'N$65,000-91,000', category: 'Hatchback', popularity: 'high' },
  { model: 'Audi A4 B8/B9', year: '2013-2018', engineSize: '1.8L/2.0L TFSI', priceRangeJPY: '¥200,000-750,000', priceRangeNAD: 'N$26,000-97,500', category: 'Sedan', popularity: 'high' },
  { model: 'Audi A5', year: '2013-2016', engineSize: '2.0L TFSI', priceRangeJPY: 'Limited data', priceRangeNAD: 'Contact dealer', category: 'Coupe', notes: 'Limited auction history' },
  { model: 'Audi A6', year: '2013-2016', engineSize: '2.0L/3.0L TFSI', priceRangeJPY: '¥400,000-600,000', priceRangeNAD: 'N$52,000-78,000', category: 'Sedan' },
  { model: 'Audi Q3', year: '2013-2016', engineSize: '1.4L/2.0L TFSI', priceRangeJPY: '¥500,000-600,000', priceRangeNAD: 'N$65,000-78,000', category: 'SUV' },
  { model: 'Audi Q5', year: '2013-2018', engineSize: '2.0L TFSI', priceRangeJPY: '¥800,000-1,500,000', priceRangeNAD: 'N$104,000-195,000', category: 'SUV', popularity: 'high' },

  // BMW
  { model: 'BMW 1 Series', year: '2013-2016', engineSize: '116i/118i', priceRangeJPY: '¥300,000-400,000', priceRangeNAD: 'N$39,000-52,000', category: 'Hatchback' },
  { model: 'BMW 3 Series F30', year: '2013-2016', engineSize: '320i/328i', priceRangeJPY: '¥400,000-600,000', priceRangeNAD: 'N$52,000-78,000', category: 'Sedan', popularity: 'high' },
  { model: 'BMW 4 Series', year: '2013-2016', engineSize: '420i/428i', priceRangeJPY: '¥600,000-800,000', priceRangeNAD: 'N$78,000-104,000', category: 'Coupe' },
  { model: 'BMW 5 Series', year: '2013-2016', engineSize: '520i/528i', priceRangeJPY: '¥500,000-600,000', priceRangeNAD: 'N$65,000-78,000', category: 'Sedan' },
  { model: 'BMW 6 Series', year: '2013-2016', engineSize: '640i/650i', priceRangeJPY: '¥700,000+', priceRangeNAD: 'N$91,000+', category: 'Coupe', notes: 'Luxury model' },
  { model: 'BMW 7 Series', year: '2013-2017', engineSize: '740i/750i', priceRangeJPY: '¥500,000-1,400,000', priceRangeNAD: 'N$65,000-182,000', category: 'Sedan', notes: 'Luxury flagship' },
  { model: 'BMW X1', year: '2013-2017', engineSize: 'sDrive18i/20i', priceRangeJPY: '¥300,000-800,000', priceRangeNAD: 'N$39,000-104,000', category: 'SUV' },
  { model: 'BMW X3', year: '2013-2016', engineSize: 'xDrive20i/28i', priceRangeJPY: '¥400,000-800,000', priceRangeNAD: 'N$52,000-104,000', category: 'SUV', popularity: 'high' },
  { model: 'BMW X5', year: '2013-2017', engineSize: 'xDrive35i/50i', priceRangeJPY: '¥1,500,000+', priceRangeNAD: 'N$195,000+', category: 'SUV', notes: 'Premium SUV' },

  // Mercedes-Benz
  { model: 'Mercedes A-Class', year: '2013-2016', engineSize: 'A180/A200', priceRangeJPY: '¥400,000', priceRangeNAD: 'N$52,000', category: 'Hatchback' },
  { model: 'Mercedes C-Class', year: '2013-2016', engineSize: 'C180/C200', priceRangeJPY: '¥600,000-900,000', priceRangeNAD: 'N$78,000-117,000', category: 'Sedan', popularity: 'high' },
  { model: 'Mercedes E-Class', year: '2013-2016', engineSize: 'E250/E350', priceRangeJPY: '¥700,000-1,300,000', priceRangeNAD: 'N$91,000-169,000', category: 'Sedan' },
  { model: 'Mercedes B-Class', year: '2013-2016', engineSize: 'B180/B200', priceRangeJPY: '¥200,000-300,000', priceRangeNAD: 'N$26,000-39,000', category: 'MPV' },
  { model: 'Mercedes C63 AMG', year: '2013-2017', engineSize: '6.2L V8', priceRangeJPY: '¥4,000,000+', priceRangeNAD: 'N$520,000+', category: 'Sport', notes: 'High performance AMG' },

  // Honda
  { model: 'Honda Fit', year: '2013-2018', engineSize: '1.3L/1.5L', priceRangeJPY: '¥250,000-400,000', priceRangeNAD: 'N$32,500-52,000', category: 'Compact', popularity: 'high' },

  // Nissan
  { model: 'Nissan Note', year: '2013-2018', engineSize: '1.2L', priceRangeJPY: '¥150,000-300,000', priceRangeNAD: 'N$19,500-39,000', category: 'Compact' }
]

export default function VehiclePricingDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'price' | 'model'>('model')

  const categories = ['all', ...Array.from(new Set(vehicleDatabase.map(v => v.category)))]

  const filteredVehicles = vehicleDatabase
    .filter(vehicle => {
      const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        // Sort by the first number in the JPY price range
        const aPrice = parseInt(a.priceRangeJPY.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0')
        const bPrice = parseInt(b.priceRangeJPY.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0')
        return aPrice - bPrice
      }
      return a.model.localeCompare(b.model)
    })

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Japanese Auction Price Database
        </h2>
        <p className="text-gray-600">
          Real auction price ranges from expert Japanese exporters - Updated December 2024
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Important:</strong> These are auction prices only. Add ¥120,000-150,000 for FOB costs,
              plus N$70,000-165,000 for shipping, duties, clearing, and local charges for total landed cost.
              Exchange rate: ¥1 = N$0.13 (approximate)
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicle model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'model')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="model">Sort by Model</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Year Range</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Engine</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Auction Price (JPY)</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Auction Price (NAD)</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{vehicle.model}</span>
                    {vehicle.popularity === 'high' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                    {vehicle.popularity === 'medium' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        Good Choice
                      </span>
                    )}
                    {vehicle.notes && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {vehicle.notes}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{vehicle.year}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">{vehicle.engineSize}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {vehicle.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {vehicle.priceRangeJPY}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-blue-600">
                  {vehicle.priceRangeNAD || 'Calculate'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note on FOB:</strong> FOB (Free On Board) price = Auction price + ¥120,000-150,000 (depending on auction location).
          Total landed cost includes FOB + shipping + duties + clearing.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Source:</strong> Direct from Japanese export agents with current market data (December 2024)
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Exchange Rate:</strong> ¥1 = N$0.13 (approximate, check current rates)
        </p>
      </div>
    </div>
  )
}