'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Package, 
  Ship, 
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Info,
  TrendingUp
} from 'lucide-react'

export default function BookSlotPage() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleDetails: '',
    preferredMonth: '',
    portFrom: 'Yokohama',
    portTo: 'Walvis Bay',
    containerType: '40ft',
    sharingPreference: 'yes',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    notes: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // Submit to API (using the existing calculator/save endpoint as example)
      const response = await fetch('/api/calculator/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'container_slot_request',
          data: formData
        })
      })
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to submit request. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Slot Request Submitted!</h1>
        <p className="text-gray-600 mb-8">
          Our partners will contact you within 24-48 hours with available options.
        </p>
        <Button onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reserve Container Slot
        </h1>
        <p className="text-gray-600">
          Book your space with Transworld Cargo or DB Schenker for 60% savings
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold">60% Savings</div>
            <div className="text-sm text-gray-600">Through sharing</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <Ship className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold">Priority Loading</div>
            <div className="text-sm text-gray-600">Guaranteed space</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold">Verified Partners</div>
            <div className="text-sm text-gray-600">Trusted shippers</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold">Full Insurance</div>
            <div className="text-sm text-gray-600">Complete coverage</div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Form */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Container Slot Request Form</CardTitle>
          <CardDescription>
            Fill in your details and we'll match you with available slots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Vehicle Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <select
                    id="vehicleType"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Pickup">Pickup/Bakkie</option>
                    <option value="Van">Van</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="vehicleDetails">Make, Model & Year</Label>
                  <Input
                    id="vehicleDetails"
                    placeholder="e.g., Toyota Prius 2018"
                    value={formData.vehicleDetails}
                    onChange={(e) => setFormData({...formData, vehicleDetails: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Shipping Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="portFrom">Port From (Japan)</Label>
                  <select
                    id="portFrom"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.portFrom}
                    onChange={(e) => setFormData({...formData, portFrom: e.target.value})}
                  >
                    <option value="Yokohama">Yokohama</option>
                    <option value="Nagoya">Nagoya</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Osaka">Osaka</option>
                    <option value="Kobe">Kobe</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="portTo">Port To (Africa)</Label>
                  <select
                    id="portTo"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.portTo}
                    onChange={(e) => setFormData({...formData, portTo: e.target.value})}
                  >
                    <option value="Walvis Bay">Walvis Bay, Namibia</option>
                    <option value="Durban">Durban, South Africa</option>
                    <option value="Cape Town">Cape Town, South Africa</option>
                    <option value="Dar es Salaam">Dar es Salaam, Tanzania</option>
                    <option value="Maputo">Maputo, Mozambique</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="preferredMonth">Preferred Shipping Month</Label>
                  <Input
                    id="preferredMonth"
                    type="month"
                    value={formData.preferredMonth}
                    onChange={(e) => setFormData({...formData, preferredMonth: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="containerType">Container Type</Label>
                  <select
                    id="containerType"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.containerType}
                    onChange={(e) => setFormData({...formData, containerType: e.target.value})}
                  >
                    <option value="20ft">20ft Standard</option>
                    <option value="40ft">40ft Standard</option>
                    <option value="40ft HC">40ft High Cube</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="sharing">Open to Container Sharing?</Label>
                  <select
                    id="sharing"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.sharingPreference}
                    onChange={(e) => setFormData({...formData, sharingPreference: e.target.value})}
                  >
                    <option value="yes">Yes - Save 60%</option>
                    <option value="no">No - Solo container</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+264..."
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Any special requirements or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>

            {/* Partners Info */}
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Our Partners:</strong> Your request will be sent to Transworld Cargo 
                and DB Schenker. They will contact you within 24-48 hours with available options 
                and pricing.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Container Slot Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}