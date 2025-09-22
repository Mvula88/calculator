'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  Map,
  Star,
  AlertCircle,
  DollarSign,
  Clock,
  BookOpen
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

      {/* Import Terms Glossary */}
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Import Terms Dictionary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">FOB Price</h4>
              <p className="text-sm text-gray-600">The car's price in Japan (before shipping)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">CIF Value</h4>
              <p className="text-sm text-gray-600">Car price + shipping + insurance costs</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">ICD</h4>
              <p className="text-sm text-gray-600">Import Customs Duty - main import tax</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">ENV</h4>
              <p className="text-sm text-gray-600">Environmental levy on vehicle imports</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">ADV</h4>
              <p className="text-sm text-gray-600">Ad Valorem tax - percentage-based import tax</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">VAT</h4>
              <p className="text-sm text-gray-600">Value Added Tax on imported goods (15-16.5%)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Clearing Agent</h4>
              <p className="text-sm text-gray-600">Company that handles customs paperwork for you</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Auction Grade</h4>
              <p className="text-sm text-gray-600">Japan's car condition rating (3.5+ is good)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Landed Cost</h4>
              <p className="text-sm text-gray-600">Total cost including all fees and taxes</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Container Sharing</h4>
              <p className="text-sm text-gray-600">Split shipping costs with other importers</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">RoRo</h4>
              <p className="text-sm text-gray-600">Roll-on/Roll-off shipping (drive on/off ship)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">De-registration</h4>
              <p className="text-sm text-gray-600">Removing vehicle from Japan's registry for export</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Export Certificate</h4>
              <p className="text-sm text-gray-600">Japan's official document allowing export</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Bill of Lading</h4>
              <p className="text-sm text-gray-600">Shipping document proving ownership</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">NATIS</h4>
              <p className="text-sm text-gray-600">Namibian vehicle registration system</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories - Real Vehicle Import Examples */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Real Vehicle Import Examples - Actual Costs Breakdown
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2015 Golf 7R</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction price (JPY 455,000)</span> <span className="font-semibold">N$ 53,205.88</span></p>
                <p><span className="text-gray-600">Japan side costs (JPY 159,640)</span> <span className="font-semibold">N$ 18,667.66</span></p>
                <p><span className="text-gray-600">Ocean Freight (JPY 137,000)</span> <span className="font-semibold">N$ 16,020.23</span></p>
                <p className="font-semibold text-gray-700 mt-2">Custom Duties and Taxes:</p>
                <p className="pl-4"><span className="text-gray-600">• ICD</span> <span className="font-semibold">N$ 18,784.04</span></p>
                <p className="pl-4"><span className="text-gray-600">• ENV</span> <span className="font-semibold">N$ 3,960.00</span></p>
                <p className="pl-4"><span className="text-gray-600">• ADV</span> <span className="font-semibold">N$ 2,530.89</span></p>
                <p className="pl-4"><span className="text-gray-600">• VAT</span> <span className="font-semibold">N$ 12,397.46</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-blue-600 font-bold">TOTAL LANDED COST FOR 2015 GOLF 7R: N$ 125,566.16</p>
                  <p className="text-xs text-gray-500">Timeline: 2-3 months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2017 AUDI A3 SPORTBACK 1.4L</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction price (JPY 201,000)</span> <span className="font-semibold">N$ 23,504.14</span></p>
                <p><span className="text-gray-600">Japan side costs (JPY 134,340)</span> <span className="font-semibold">N$ 15,709.18</span></p>
                <p><span className="text-gray-600">Ocean Freight (JPY 137,000)</span> <span className="font-semibold">N$ 16,020.23</span></p>
                <p className="font-semibold text-gray-700 mt-2">Custom Duties and Taxes:</p>
                <p className="pl-4"><span className="text-gray-600">• ICD</span> <span className="font-semibold">N$ 9,239.83</span></p>
                <p className="pl-4"><span className="text-gray-600">• ENV</span> <span className="font-semibold">N$ 2,780.00</span></p>
                <p className="pl-4"><span className="text-gray-600">• ADV</span> <span className="font-semibold">N$ 414.98</span></p>
                <p className="pl-4"><span className="text-gray-600">• VAT</span> <span className="font-semibold">N$ 6,098.28</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-blue-600 font-bold">TOTAL LANDED COST FOR 2017 AUDI A3 SPORTBACK 1.4L: N$ 73,766.64</p>
                  <p className="text-xs text-gray-500">Timeline: 2-3 months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2015 AUDI A5 QUATTRO 2.0L</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction price (JPY 231,000)</span> <span className="font-semibold">N$ 27,012.22</span></p>
                <p><span className="text-gray-600">Japan side costs (JPY 124,440)</span> <span className="font-semibold">N$ 14,551.52</span></p>
                <p><span className="text-gray-600">Ocean Freight (JPY 137,000)</span> <span className="font-semibold">N$ 16,020.23</span></p>
                <p className="font-semibold text-gray-700 mt-2">Custom Duties and Taxes:</p>
                <p className="pl-4"><span className="text-gray-600">• ICD</span> <span className="font-semibold">N$ 10,862.62</span></p>
                <p className="pl-4"><span className="text-gray-600">• ENV</span> <span className="font-semibold">N$ 3,960.00</span></p>
                <p className="pl-4"><span className="text-gray-600">• ADV</span> <span className="font-semibold">N$ 653.93</span></p>
                <p className="pl-4"><span className="text-gray-600">• VAT</span> <span className="font-semibold">N$ 7,169.33</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-blue-600 font-bold">TOTAL LANDED COST FOR 2015 AUDI A5 QUATTRO 2.0L: N$ 80,229.85</p>
                  <p className="text-xs text-gray-500">Timeline: 2-3 months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold mb-2">2012 AUDI A4 QUATTRO 2.0L</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Japan Auction price (JPY 200,000)</span> <span className="font-semibold">N$ 23,387.20</span></p>
                <p><span className="text-gray-600">Japan side costs (JPY 123,560)</span> <span className="font-semibold">N$ 14,448.61</span></p>
                <p><span className="text-gray-600">Ocean Freight (JPY 137,000)</span> <span className="font-semibold">N$ 16,020.23</span></p>
                <p className="font-semibold text-gray-700 mt-2">Custom Duties and Taxes:</p>
                <p className="pl-4"><span className="text-gray-600">• ICD</span> <span className="font-semibold">N$ 9,888.33</span></p>
                <p className="pl-4"><span className="text-gray-600">• ENV</span> <span className="font-semibold">N$ 3,960.00</span></p>
                <p className="pl-4"><span className="text-gray-600">• ADV</span> <span className="font-semibold">N$ 504.46</span></p>
                <p className="pl-4"><span className="text-gray-600">• VAT</span> <span className="font-semibold">N$ 6,526.30</span></p>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-blue-600 font-bold">TOTAL LANDED COST FOR 2012 AUDI A4 QUATTRO 2.0L: N$ 74,735.13</p>
                  <p className="text-xs text-gray-500">Timeline: 2-3 months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">Import Cost Analysis - Key Insights</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-green-700 font-semibold mb-1">Consistent Shipping Costs</p>
                    <p className="text-gray-700">Sea freight is typically N$18,000 regardless of vehicle value, making higher-value cars more cost-effective to import.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-green-700 font-semibold mb-1">Additional Costs Rule of Thumb</p>
                    <p className="text-gray-700">Expect to pay 150-250% of the FOB price as total landed cost. Lower-value cars have higher percentage markups due to fixed shipping costs.</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-green-700 font-semibold mb-1">Best Value Range</p>
                    <p className="text-gray-700">Cars in the N$10,000-25,000 FOB price range offer the best balance of quality and import efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Country Import Restrictions Quick Reference */}
      <Card className="mb-8 border-red-200">
        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertCircle className="h-6 w-6 text-red-600" />
            Country Import Restrictions (2024-2025)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Namibia */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇳🇦</span>
                <h3 className="font-bold text-lg">Namibia</h3>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Age Limit:</strong> 12 years maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Only right-hand drive vehicles allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-gray-600">Extended from 8 years in July 2022</span>
                </li>
              </ul>
            </div>

            {/* South Africa */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇿🇦</span>
                <h3 className="font-bold text-lg">South Africa</h3>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">⚠️</span>
                  <span className="font-semibold text-red-700">NO general used vehicle imports</span>
                </li>
                <li className="text-gray-700 ml-6">Exceptions only for:</li>
                <li className="ml-8 text-gray-600">• Returning residents (6+ months abroad)</li>
                <li className="ml-8 text-gray-600">• Immigrants with permanent residence</li>
                <li className="ml-8 text-gray-600">• Vintage vehicles (40+ years)</li>
                <li className="ml-8 text-gray-600">• Special needs/racing vehicles</li>
                <li className="flex items-start gap-2 mt-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Requires ITAC permit + Letter of Authority</span>
                </li>
              </ul>
            </div>

            {/* Botswana */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇧🇼</span>
                <h3 className="font-bold text-lg">Botswana</h3>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>No engine size restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Both left and right-hand drive allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-gray-600 italic">Simplest import rules in region</span>
                </li>
              </ul>
            </div>

            {/* Zambia */}
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇿🇲</span>
                <h3 className="font-bold text-lg">Zambia</h3>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">⚠️</span>
                  <span>Vehicles over 5 years = higher surtaxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Only right-hand drive (except emergency vehicles)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Duty varies by engine capacity & age</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>💡 Key Insight:</strong> Botswana offers the most flexibility, while South Africa has the strictest rules.
              Namibia's 12-year limit makes newer vehicles more viable for long-term value.
            </p>
          </div>
        </CardContent>
      </Card>

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
                <h4 className="font-semibold mb-1">Ocean Shipping (2-3 Months)</h4>
                <p className="text-gray-600">Vehicle loaded on ship at Japanese port, sails to African port</p>
                <p className="text-sm text-blue-600 mt-1">Budget needed: N$15,000-20,000 shipping costs</p>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                  <p className="font-semibold mb-1">What happens:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Loading at Japanese port (Yokohama/Nagoya)</li>
                    <li>• 2-3 months total shipping time (includes transit & handling)</li>
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

      {/* Risks & Reality Check */}
      <Card className="mb-8 border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            Risks & Reality Check
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-4 font-medium">Importing isn't risk-free. Here's what can happen:</p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Delays (Common)</p>
                <p className="text-sm text-gray-600">Shipping delays, port congestion, paperwork issues can add 2-4 weeks</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Hidden Costs (Occasional)</p>
                <p className="text-sm text-gray-600">Storage fees, additional inspections, exchange rate fluctuations</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Vehicle Condition Issues (Rare with good agents)</p>
                <p className="text-sm text-gray-600">Car not matching description, hidden damage, odometer tampering</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Regulatory Changes (Very Rare)</p>
                <p className="text-sm text-gray-600">Import rules or duty rates change while car is in transit</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Documentation Problems</p>
                <p className="text-sm text-gray-600">Missing or incorrect paperwork can delay clearance significantly</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">How We Help Minimize These Risks:</p>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Verified agents reduce condition and documentation issues</li>
              <li>• Accurate calculators prevent budget surprises</li>
              <li>• Step-by-step guides avoid common mistakes</li>
              <li>• Real examples show realistic timelines</li>
              <li>• Document checklists ensure nothing is missed</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">Pro Tips to Avoid Problems:</p>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Always budget 15% extra for unexpected costs</li>
              <li>• Tell people to expect 12 weeks (pleasant surprise if faster)</li>
              <li>• Use Grade 4+ vehicles for fewer surprises</li>
              <li>• Work with established agents only</li>
            </ul>
          </div>
        </CardContent>
      </Card>

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