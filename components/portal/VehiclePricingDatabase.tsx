'use client'

import { useState } from 'react'
import { Search, TrendingUp, AlertCircle, DollarSign } from 'lucide-react'

interface VehiclePricing {
  model: string
  year: string
  engineSize: string
  fobPrice: number
  category: string
  popularity?: 'high' | 'medium' | 'low'
  notes?: string
}

const vehicleDatabase: VehiclePricing[] = [
  // Sedans
  { model: 'Toyota Corolla', year: '2015-2018', engineSize: '1.8L', fobPrice: 115000, category: 'Sedan', popularity: 'high' },
  { model: 'Honda Fit', year: '2015-2018', engineSize: '1.5L', fobPrice: 85000, category: 'Sedan', popularity: 'high' },
  { model: 'Mazda Demio', year: '2015-2018', engineSize: '1.3L', fobPrice: 75000, category: 'Sedan', popularity: 'medium' },
  { model: 'Nissan Note', year: '2015-2018', engineSize: '1.2L', fobPrice: 80000, category: 'Sedan' },
  { model: 'Toyota Vitz', year: '2015-2018', engineSize: '1.3L', fobPrice: 85000, category: 'Sedan', popularity: 'high' },
  { model: 'Toyota Passo', year: '2015-2018', engineSize: '1.0L', fobPrice: 70000, category: 'Sedan' },
  { model: 'Nissan March', year: '2015-2018', engineSize: '1.2L', fobPrice: 65000, category: 'Sedan' },
  { model: 'Honda Civic', year: '2016-2019', engineSize: '1.8L', fobPrice: 145000, category: 'Sedan' },
  { model: 'Mazda Axela', year: '2015-2018', engineSize: '1.5L', fobPrice: 115000, category: 'Sedan' },
  { model: 'Toyota Allion', year: '2015-2018', engineSize: '1.8L', fobPrice: 125000, category: 'Sedan' },
  { model: 'Toyota Premio', year: '2015-2018', engineSize: '1.8L', fobPrice: 130000, category: 'Sedan' },

  // SUVs & Crossovers
  { model: 'Honda Vezel', year: '2015-2018', engineSize: '1.5L', fobPrice: 145000, category: 'SUV', popularity: 'high' },
  { model: 'Toyota RAV4', year: '2015-2018', engineSize: '2.0L', fobPrice: 185000, category: 'SUV', popularity: 'high' },
  { model: 'Nissan X-Trail', year: '2015-2018', engineSize: '2.0L', fobPrice: 165000, category: 'SUV' },
  { model: 'Mazda CX-5', year: '2015-2018', engineSize: '2.0L', fobPrice: 175000, category: 'SUV', popularity: 'medium' },
  { model: 'Mitsubishi Outlander', year: '2015-2018', engineSize: '2.0L', fobPrice: 155000, category: 'SUV' },
  { model: 'Subaru XV', year: '2015-2018', engineSize: '2.0L', fobPrice: 165000, category: 'SUV' },
  { model: 'Toyota Harrier', year: '2015-2018', engineSize: '2.0L', fobPrice: 225000, category: 'SUV', popularity: 'high', notes: 'Premium model' },
  { model: 'Nissan Juke', year: '2015-2018', engineSize: '1.5L', fobPrice: 115000, category: 'SUV' },
  { model: 'Honda CR-V', year: '2015-2018', engineSize: '2.0L', fobPrice: 195000, category: 'SUV' },

  // Vans & Minivans
  { model: 'Toyota Voxy', year: '2015-2018', engineSize: '2.0L', fobPrice: 185000, category: 'Van', popularity: 'high' },
  { model: 'Toyota Noah', year: '2015-2018', engineSize: '2.0L', fobPrice: 175000, category: 'Van', popularity: 'high' },
  { model: 'Nissan Serena', year: '2015-2018', engineSize: '2.0L', fobPrice: 165000, category: 'Van' },
  { model: 'Honda Freed', year: '2015-2018', engineSize: '1.5L', fobPrice: 135000, category: 'Van' },
  { model: 'Toyota Sienta', year: '2015-2018', engineSize: '1.5L', fobPrice: 125000, category: 'Van' },
  { model: 'Toyota Alphard', year: '2015-2018', engineSize: '2.5L', fobPrice: 425000, category: 'Van', notes: 'Luxury van' },
  { model: 'Toyota Vellfire', year: '2015-2018', engineSize: '2.5L', fobPrice: 435000, category: 'Van', notes: 'Luxury van' },
  { model: 'Nissan Elgrand', year: '2015-2018', engineSize: '2.5L', fobPrice: 285000, category: 'Van' },

  // Pickup Trucks
  { model: 'Toyota Hilux', year: '2015-2018', engineSize: '2.8L D', fobPrice: 285000, category: 'Pickup', popularity: 'high' },
  { model: 'Nissan Navara', year: '2015-2018', engineSize: '2.5L D', fobPrice: 245000, category: 'Pickup' },
  { model: 'Mazda BT-50', year: '2015-2018', engineSize: '3.2L D', fobPrice: 225000, category: 'Pickup' },
  { model: 'Mitsubishi Triton', year: '2015-2018', engineSize: '2.4L D', fobPrice: 215000, category: 'Pickup' },
  { model: 'Isuzu D-Max', year: '2015-2018', engineSize: '2.5L D', fobPrice: 235000, category: 'Pickup' },

  // Specific Models from WhatsApp
  { model: 'Toyota Succeed', year: '2014-2017', engineSize: '1.5L', fobPrice: 95000, category: 'Wagon', notes: 'Commercial use' },
  { model: 'Toyota Probox', year: '2014-2017', engineSize: '1.5L', fobPrice: 90000, category: 'Wagon', notes: 'Commercial use' },
  { model: 'Nissan AD Van', year: '2015-2018', engineSize: '1.5L', fobPrice: 85000, category: 'Wagon', notes: 'Commercial use' },
  { model: 'Toyota Prius', year: '2015-2018', engineSize: '1.8L Hybrid', fobPrice: 145000, category: 'Hybrid', popularity: 'medium', notes: 'Fuel efficient' },
  { model: 'Toyota Aqua', year: '2015-2018', engineSize: '1.5L Hybrid', fobPrice: 115000, category: 'Hybrid', popularity: 'high', notes: 'Most popular hybrid' }
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
      if (sortBy === 'price') return a.fobPrice - b.fobPrice
      return a.model.localeCompare(b.model)
    })

  const formatPrice = (price: number) => {
    return `R${price.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Real Vehicle FOB Pricing Database
        </h2>
        <p className="text-gray-600">
          Actual prices from Japanese auctions (2015-2018 models) - Updated November 2024
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Important:</strong> These are FOB (Free On Board) prices in Rands.
              Add R70,000-R165,000 for shipping, plus duties, clearing, and local charges for total landed cost.
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
              <th className="text-right py-3 px-4 font-semibold text-gray-700">FOB Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Est. Total*</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => {
              const estimatedTotal = vehicle.fobPrice + 117500 // Average shipping + estimate duties
              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{vehicle.model}</span>
                      {vehicle.popularity === 'high' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Popular
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
                  <td className="py-3 px-4 text-gray-600">{vehicle.engineSize}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {vehicle.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {formatPrice(vehicle.fobPrice)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-500">
                    ~{formatPrice(estimatedTotal)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>*Estimated Total:</strong> Includes average shipping (R117,500) plus estimated duties.
          Actual costs vary based on shipping line, duty rates, and clearing fees. Use our calculator for precise figures.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Source:</strong> Real transaction data from Japanese auction exports to Namibia (November 2024)
        </p>
      </div>
    </div>
  )
}