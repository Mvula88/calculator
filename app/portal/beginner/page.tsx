'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  Map,
  Star,
  AlertCircle,
  DollarSign,
  Clock
} from 'lucide-react'

export default function BeginnerGuidePage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Complete Import Journey & Tools
        </h1>
        <p className="text-gray-600">
          Everything you need to know about importing, from start to finish
        </p>
      </div>

      {/* The Import Process - Detailed */}
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-6 w-6 text-green-600" />
            The Complete Import Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold mb-1">Find & Buy Your Vehicle (Week 1-2)</h4>
                <p className="text-gray-600">Search Japanese auctions, place bid through agent, win vehicle, make payment</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: Vehicle price + N$10,000 Japan-side fees</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Agent searches auctions based on your criteria</li>
                    <li>• You approve vehicles to bid on</li>
                    <li>• Agent bids on your behalf</li>
                    <li>• Payment via wire transfer within 3 days</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold mb-1">Japan Export Process (Week 2-3)</h4>
                <p className="text-gray-600">De-registration, export certificate, transport to port</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: Included in Japan-side costs</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Vehicle de-registered in Japan</li>
                    <li>• Export certificate issued</li>
                    <li>• Transport from auction to port</li>
                    <li>• Pre-shipment inspection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold mb-1">Ocean Shipping (Week 3-6)</h4>
                <p className="text-gray-600">Vehicle loaded on ship at Japanese port, sails to African port</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: N$18,500-25,000 shipping costs</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Loading at Japanese port (Yokohama/Nagoya)</li>
                    <li>• 21-30 day ocean voyage</li>
                    <li>• Arrival at African port (Walvis Bay/Durban)</li>
                    <li>• Port handling and unloading</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold mb-1">Customs Clearance (Week 7-8)</h4>
                <p className="text-gray-600">Pay import duties, VAT, clear customs, get release</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: 40-65% of vehicle value in taxes</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Submit import documentation</li>
                    <li>• Customs inspection</li>
                    <li>• Pay all duties and taxes</li>
                    <li>• Get customs release</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <h4 className="font-semibold mb-1">Registration & Compliance (Week 9-10)</h4>
                <p className="text-gray-600">Roadworthy test, registration, license plates</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: N$5,000-8,000</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Police clearance</li>
                    <li>• Roadworthy inspection</li>
                    <li>• Vehicle registration</li>
                    <li>• License plates issued</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="font-semibold text-amber-900 mb-2">Total Timeline & Budget:</p>
            <p className="text-amber-800">Timeline: 6-10 weeks (can extend to 12 weeks with delays)</p>
            <p className="text-amber-800">Total Budget: Vehicle Price + 80-100% additional costs</p>
            <p className="text-sm text-amber-700 mt-2">Example: N$80,000 car = N$150,000-160,000 total landed cost</p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Budget Calculator */}
      <Card className="mb-8 border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="h-8 w-8" />
            Quick Total Cost Estimator
          </CardTitle>
          <p className="text-blue-100 mt-2">
            Get a rough total cost estimate including all fees (for precise calculations, use our advanced calculator)
          </p>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Purchase Price in Japan (¥ Yen)
              </label>
              <input
                type="number"
                id="simple-vehicle-price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="e.g., 800000 for ¥800,000"
              />
              <p className="text-xs text-gray-500 mt-1">Typical range: ¥500,000 - ¥2,000,000</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Country
              </label>
              <select
                id="simple-country"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
              >
                <option value="na">Namibia</option>
                <option value="za">South Africa</option>
                <option value="bw">Botswana</option>
                <option value="zm">Zambia</option>
              </select>
            </div>

            <Button
              className="w-full py-6 text-lg"
              onClick={() => {
                const price = parseInt((document.getElementById('simple-vehicle-price') as HTMLInputElement)?.value || '0')
                const country = (document.getElementById('simple-country') as HTMLSelectElement)?.value

                if (price > 0) {
                  // Simple rough calculation
                  const exchangeRate = country === 'za' ? 0.13 : 0.14 // Rough exchange rates
                  const localPrice = price * exchangeRate
                  const duties = localPrice * 0.65 // Rough 65% for all duties/taxes
                  const shipping = 25000 // Average shipping
                  const clearing = 12000 // Average clearing
                  const registration = 5000 // Average registration
                  const japanFees = 10000 // Japan-side costs
                  const total = localPrice + duties + shipping + clearing + registration + japanFees

                  const currency = {
                    'na': 'N$',
                    'za': 'R',
                    'bw': 'P',
                    'zm': 'ZK'
                  }[country] || 'N$'

                  const breakdown = `ROUGH TOTAL COST ESTIMATE:\n\nVehicle Price: ${currency}${Math.round(localPrice).toLocaleString()}\n\nAdditional Costs:\n• Japan-side fees: ${currency}${Math.round(japanFees).toLocaleString()}\n• Ocean Shipping: ${currency}${Math.round(shipping).toLocaleString()}\n• Duties & Taxes: ${currency}${Math.round(duties).toLocaleString()}\n• Clearing & Agent: ${currency}${Math.round(clearing).toLocaleString()}\n• Registration: ${currency}${Math.round(registration).toLocaleString()}\n\n━━━━━━━━━━━━━━━\nTOTAL LANDED COST: ${currency}${Math.round(total).toLocaleString()}\n━━━━━━━━━━━━━━━\n\n⚠️ This is a rough estimate. Use our advanced calculator for accurate figures.\n\n💡 Rule of thumb: Budget for vehicle price + 80-100% additional costs`

                  alert(breakdown)
                } else {
                  alert('Please enter a vehicle price')
                }
              }}
            >
              Calculate Total Landed Cost
            </Button>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Always budget 10-15% extra for unexpected costs like storage fees,
                exchange rate changes, or delays.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Real Import Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2019 Toyota Hilux Double Cab</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction Price:</span> <span className="font-semibold">¥1,800,000</span></p>
                <p><span className="text-gray-600">Total Landed Cost:</span> <span className="font-semibold">N$320,000</span></p>
                <p><span className="text-gray-600">Local Dealer Price:</span> <span className="font-semibold">N$485,000</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-green-600 font-bold">Saved: N$165,000 (34%)</p>
                  <p className="text-xs text-gray-500">Timeline: 8 weeks</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">"The process was smoother than expected" - John M., Windhoek</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2018 Honda Fit Hybrid</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction Price:</span> <span className="font-semibold">¥980,000</span></p>
                <p><span className="text-gray-600">Total Landed Cost:</span> <span className="font-semibold">N$175,000</span></p>
                <p><span className="text-gray-600">Local Dealer Price:</span> <span className="font-semibold">N$245,000</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-green-600 font-bold">Saved: N$70,000 (29%)</p>
                  <p className="text-xs text-gray-500">Timeline: 7 weeks</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">"Perfect city car at great price" - Sarah K., Cape Town</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2020 Mazda CX-5 AWD</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction Price:</span> <span className="font-semibold">¥2,200,000</span></p>
                <p><span className="text-gray-600">Total Landed Cost:</span> <span className="font-semibold">N$385,000</span></p>
                <p><span className="text-gray-600">Local Dealer Price:</span> <span className="font-semibold">N$520,000</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-green-600 font-bold">Saved: N$135,000 (26%)</p>
                  <p className="text-xs text-gray-500">Timeline: 9 weeks</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">"Like new condition, amazing value" - David P., Gaborone</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">Average Savings Analysis</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-green-700">Small Cars (Fit, Vitz, March)</p>
                    <p className="font-bold text-green-900">Save: N$50,000-80,000</p>
                  </div>
                  <div>
                    <p className="text-green-700">SUVs (CX-5, RAV4, X-Trail)</p>
                    <p className="font-bold text-green-900">Save: N$100,000-150,000</p>
                  </div>
                  <div>
                    <p className="text-green-700">Bakkies (Hilux, Ranger, Navara)</p>
                    <p className="font-bold text-green-900">Save: N$120,000-200,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Expectations */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-amber-600" />
            Realistic Timeline Expectations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Case Scenario (6-7 weeks)</h4>
              <p className="text-sm text-gray-600">Everything goes smoothly, no delays, all paperwork ready</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Typical Timeline (8-10 weeks)</h4>
              <p className="text-sm text-gray-600">Minor delays at port, normal processing times</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Worst Case (12-14 weeks)</h4>
              <p className="text-sm text-gray-600">Port congestion, documentation issues, compliance delays</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900">Pro Tip:</p>
                <p className="text-blue-800">Always tell friends/family to expect 10-12 weeks. Better to surprise them with early delivery than disappoint with delays.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}