'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Package, 
  Ship, 
  Calendar, 
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Award,
  Shield,
  Truck,
  Anchor,
  Waves,
  Route,
  Info
} from 'lucide-react'

interface Slot {
  id: string
  vessel: string
  departure: string
  arrival: string
  route: string
  price: number
  available: number
  total: number
  carrier: string
  transitTime: string
  features: string[]
  recommended?: boolean
}

const availableSlots: Slot[] = [
  {
    id: 'MS001',
    vessel: 'MSC Lucinda',
    departure: '2024-03-15',
    arrival: '2024-04-08', 
    route: 'Southampton → Cape Town',
    price: 32500,
    available: 12,
    total: 24,
    carrier: 'MSC',
    transitTime: '24 days',
    features: ['Climate Control', 'Insurance Included', 'Priority Handling'],
    recommended: true
  },
  {
    id: 'MS002',
    vessel: 'Safmarine Meru',
    departure: '2024-03-18',
    arrival: '2024-04-12',
    route: 'Hamburg → Durban',
    price: 29800,
    available: 8,
    total: 20,
    carrier: 'Safmarine',
    transitTime: '25 days', 
    features: ['Vehicle Tracking', 'Express Clearance', 'Door-to-Door']
  },
  {
    id: 'MS003',
    vessel: 'Maersk Cardiff',
    departure: '2024-03-22',
    arrival: '2024-04-15',
    route: 'Felixstowe → Cape Town',
    price: 35200,
    available: 15,
    total: 28,
    carrier: 'Maersk',
    transitTime: '24 days',
    features: ['Premium Security', 'Live GPS', 'Damage Protection']
  },
  {
    id: 'MS004',
    vessel: 'CMA CGM Marseille',
    departure: '2024-03-25',
    arrival: '2024-04-20',
    route: 'Le Havre → Durban',
    price: 28900,
    available: 6,
    total: 16,
    carrier: 'CMA CGM',
    transitTime: '26 days',
    features: ['Budget Option', 'Standard Security', 'Basic Insurance']
  },
  {
    id: 'MS005',
    vessel: 'ONE Innovation',
    departure: '2024-03-28',
    arrival: '2024-04-25',
    route: 'Antwerp → Port Elizabeth',
    price: 31200,
    available: 18,
    total: 32,
    carrier: 'Ocean Network Express',
    transitTime: '28 days',
    features: ['Eco-Friendly', 'Digital Documentation', 'Port Storage']
  }
]

const ports = [
  { name: 'Cape Town', code: 'CPT', congestion: 'Low', avgDelay: '2-3 days' },
  { name: 'Durban', code: 'DUR', congestion: 'High', avgDelay: '5-7 days' },
  { name: 'Port Elizabeth', code: 'PLZ', congestion: 'Medium', avgDelay: '3-4 days' },
  { name: 'Walvis Bay', code: 'WVB', congestion: 'Low', avgDelay: '1-2 days' }
]

export default function BookContainerSlot() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [pickupLocation, setPickupLocation] = useState('')
  const [vehicleDetails, setVehicleDetails] = useState({
    make: '',
    model: '',
    year: '',
    vin: ''
  })
  const [additionalServices, setAdditionalServices] = useState({
    insurance: false,
    tracking: false,
    inspection: false,
    express: false
  })

  const calculateTotal = () => {
    if (!selectedSlot) return 0
    
    let total = selectedSlot.price
    if (additionalServices.insurance) total += 2500
    if (additionalServices.tracking) total += 800
    if (additionalServices.inspection) total += 1500
    if (additionalServices.express) total += 5000
    
    return total
  }

  const handleBooking = () => {
    if (!selectedSlot || !pickupLocation || !vehicleDetails.make) {
      alert('Please complete all required fields')
      return
    }
    
    alert(`Booking initiated for ${selectedSlot.vessel}. You will be contacted within 2 hours for payment and documentation.`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Container Slot Booking
          </h1>
          <div className="flex items-center gap-1 ml-4">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">MASTERY EXCLUSIVE</span>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Reserve your vehicle's container slot with verified shipping partners. Real-time availability 
          and guaranteed pricing with no hidden fees.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">EXCLUSIVE RATES</span>
          </div>
          <p className="text-blue-800 text-sm mt-1">
            Members save 15-25% compared to public rates. Booking fees waived for Mastery members.
          </p>
        </div>
      </div>

      {/* Port Status Dashboard */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Anchor className="h-5 w-5 text-blue-600" />
          Live Port Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {ports.map((port) => (
            <Card key={port.code} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{port.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  port.congestion === 'Low' ? 'bg-green-400' :
                  port.congestion === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
              </div>
              <div className="text-sm text-gray-600">
                <p>Congestion: <span className="font-medium">{port.congestion}</span></p>
                <p>Avg Delay: <span className="font-medium">{port.avgDelay}</span></p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Available Slots */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Ship className="h-5 w-5 text-blue-600" />
            Available Container Slots
          </h2>
          <div className="space-y-4">
            {availableSlots.map((slot) => (
              <Card 
                key={slot.id} 
                className={`p-6 cursor-pointer transition-all ${
                  selectedSlot?.id === slot.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                } ${slot.recommended ? 'border-green-400' : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.recommended && (
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">RECOMMENDED</span>
                  </div>
                )}
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{slot.vessel}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Waves className="h-4 w-4" />
                        <span>{slot.carrier}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Route className="h-4 w-4" />
                        <span>{slot.route}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{slot.transitTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>Departs: <strong>{new Date(slot.departure).toLocaleDateString()}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>Arrives: <strong>{new Date(slot.arrival).toLocaleDateString()}</strong></span>
                      </div>
                      <div className="mt-3">
                        <div className="text-xs text-gray-500">Availability</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(slot.available / slot.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{slot.available}/{slot.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      R{slot.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">per vehicle</div>
                    <div className="space-y-1">
                      {slot.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-6">Complete Booking</h3>
            
            {selectedSlot ? (
              <div className="space-y-6">
                {/* Selected Slot Summary */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">{selectedSlot.vessel}</div>
                  <div className="text-sm text-blue-800">
                    <div>Departure: {new Date(selectedSlot.departure).toLocaleDateString()}</div>
                    <div>Route: {selectedSlot.route}</div>
                    <div className="font-semibold mt-2">R{selectedSlot.price.toLocaleString()}</div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div>
                  <h4 className="font-semibold mb-3">Vehicle Information</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        value={vehicleDetails.make}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, make: e.target.value})}
                        placeholder="e.g. BMW"
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        value={vehicleDetails.model}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, model: e.target.value})}
                        placeholder="e.g. X5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="year">Year *</Label>
                        <Input
                          id="year"
                          value={vehicleDetails.year}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, year: e.target.value})}
                          placeholder="2020"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vin">VIN *</Label>
                        <Input
                          id="vin"
                          value={vehicleDetails.vin}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, vin: e.target.value})}
                          placeholder="17 digits"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <Label htmlFor="pickup">Pickup Location *</Label>
                  <select
                    id="pickup"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select pickup location</option>
                    <option value="london">London, UK</option>
                    <option value="manchester">Manchester, UK</option>
                    <option value="hamburg">Hamburg, Germany</option>
                    <option value="antwerp">Antwerp, Belgium</option>
                    <option value="rotterdam">Rotterdam, Netherlands</option>
                  </select>
                </div>

                {/* Additional Services */}
                <div>
                  <h4 className="font-semibold mb-3">Additional Services</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={additionalServices.insurance}
                        onChange={(e) => setAdditionalServices({...additionalServices, insurance: e.target.checked})}
                      />
                      <span className="text-sm">Premium Insurance (+R2,500)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={additionalServices.tracking}
                        onChange={(e) => setAdditionalServices({...additionalServices, tracking: e.target.checked})}
                      />
                      <span className="text-sm">Live GPS Tracking (+R800)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={additionalServices.inspection}
                        onChange={(e) => setAdditionalServices({...additionalServices, inspection: e.target.checked})}
                      />
                      <span className="text-sm">Pre-departure Inspection (+R1,500)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={additionalServices.express}
                        onChange={(e) => setAdditionalServices({...additionalServices, express: e.target.checked})}
                      />
                      <span className="text-sm">Express Processing (+R5,000)</span>
                    </label>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Cost:</span>
                    <span className="text-green-600">R{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <Button onClick={handleBooking} className="w-full text-lg py-3">
                  <Package className="h-5 w-5 mr-2" />
                  Confirm Booking
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>By booking, you agree to our terms and conditions.</p>
                  <p>Payment required within 24 hours to secure slot.</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Ship className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Select a container slot to continue with booking</p>
              </div>
            )}
          </Card>

          {/* Important Info */}
          <Card className="mt-6 p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Booking Process</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Slots are held for 24 hours pending payment</li>
                  <li>• Full payment required to confirm booking</li>
                  <li>• Vehicle pickup arranged 48 hours before sailing</li>
                  <li>• All documentation must be ready 7 days prior</li>
                  <li>• Cancellations possible up to 14 days before departure</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}