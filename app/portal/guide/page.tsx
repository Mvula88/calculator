import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Ship, 
  Car, 
  DollarSign,
  Clock,
  Shield,
  Info
} from 'lucide-react'

export default function PortalGuidePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Import Guide
        </h1>
        <p className="text-gray-600">
          Step-by-step instructions for importing vehicles from Japan
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Import Process Overview</CardTitle>
              <CardDescription>Understanding the complete import journey</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">The 5 Stages of Vehicle Import</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Purchase & Verification</h4>
                    <p className="text-gray-600 mt-1">
                      Select vehicle from Japanese auctions, verify condition through inspection 
                      reports, and complete purchase through authorized dealer or agent.
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">Timeline: 1-2 weeks</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Export Documentation</h4>
                    <p className="text-gray-600 mt-1">
                      Obtain Export Certificate, deregistration documents, and Bill of Lading. 
                      Ensure all documents match exactly (VIN, engine number, etc.).
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">Timeline: 3-5 days</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Shipping</h4>
                    <p className="text-gray-600 mt-1">
                      Choose between RoRo (Roll-on/Roll-off) or container shipping. Book with 
                      carriers like Maersk, MSC, or ONE Line. Transit time: 30-40 days.
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">Timeline: 30-40 days</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Customs Clearance</h4>
                    <p className="text-gray-600 mt-1">
                      Submit documents to customs, pay duties/VAT, obtain clearance certificate. 
                      Work with verified clearing agent to avoid delays and overcharging.
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">Timeline: 5-10 days</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Registration</h4>
                    <p className="text-gray-600 mt-1">
                      Complete roadworthy test, obtain police clearance, register with traffic 
                      department, and get license plates.
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">Timeline: 3-5 days</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Total Timeline:</strong> 6-8 weeks from purchase to road-ready
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Required Documentation Checklist</CardTitle>
              <CardDescription>Every document you need for successful import</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">From Japan (Seller)</h3>
                  <div className="space-y-2">
                    {[
                      'Export Certificate (original)',
                      'Deregistration Certificate',
                      'Invoice (commercial invoice)',
                      'Bill of Lading (B/L)',
                      'Inspection Certificate (if applicable)',
                      'Auction Sheet (if from auction)'
                    ].map((doc) => (
                      <div key={doc} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">For Customs Clearance</h3>
                  <div className="space-y-2">
                    {[
                      'Import Permit (if required)',
                      'Letter of Authority (for agent)',
                      'Proof of Payment (duties/taxes)',
                      'Insurance Certificate',
                      'Packing List',
                      'SARS Customs Declaration'
                    ].map((doc) => (
                      <div key={doc} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">For Registration</h3>
                  <div className="space-y-2">
                    {[
                      'Roadworthy Certificate',
                      'Police Clearance',
                      'Proof of Address',
                      'ID/Passport Copy',
                      'Customs Release Documents',
                      'Completed Registration Forms'
                    ].map((doc) => (
                      <div key={doc} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Alert className="mt-6 bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription>
                  <strong>Critical:</strong> All documents must show matching VIN, engine number, 
                  and vehicle details. One mismatch can cause weeks of delays.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Step-by-Step Process</CardTitle>
              <CardDescription>Detailed instructions for each stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Follow these exact steps to avoid the common N$45,000+ in unnecessary fees
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Pre-Purchase Checklist</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Verify auction grade (aim for Grade 4 or higher)</li>
                    <li>Check mileage authenticity (compare with auction photos)</li>
                    <li>Confirm year model eligibility (some countries restrict older vehicles)</li>
                    <li>Calculate total landed cost BEFORE bidding</li>
                    <li>Arrange financing/forex in advance</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Shipping Preparation</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Choose shipping method (RoRo vs Container)</li>
                    <li>Book shipping 2 weeks before vessel departure</li>
                    <li>Obtain marine insurance (CIF terms recommended)</li>
                    <li>Prepare vehicle (remove personal items, quarter tank fuel)</li>
                    <li>Take detailed photos before shipping</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Port Clearance Strategy</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Start document submission 5 days before arrival</li>
                    <li>Pre-clear with customs while vessel is at sea</li>
                    <li>Pay duties within 24 hours of assessment</li>
                    <li>Book inspection slot immediately after payment</li>
                    <li>Arrange transportation from port (flatbed if not roadworthy)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Common Mistakes to Avoid</CardTitle>
              <CardDescription>Learn from others' expensive errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    mistake: 'Wrong HS Code Declaration',
                    cost: 'N$15,000 - N$50,000',
                    solution: 'Use exact manufacturer codes from our database',
                    severity: 'high'
                  },
                  {
                    mistake: 'Missing Pre-Clearance',
                    cost: 'N$800/day storage',
                    solution: 'Submit documents 5 days before vessel arrival',
                    severity: 'medium'
                  },
                  {
                    mistake: 'Dishonest Clearing Agent',
                    cost: 'N$20,000 - N$45,000',
                    solution: 'Only use verified agents from our directory',
                    severity: 'high'
                  },
                  {
                    mistake: 'Incorrect Document Names',
                    cost: '2-3 week delay',
                    solution: 'Triple-check VIN/engine numbers match exactly',
                    severity: 'medium'
                  },
                  {
                    mistake: 'No Insurance',
                    cost: 'Total loss risk',
                    solution: 'Always get CIF terms with marine insurance',
                    severity: 'critical'
                  }
                ].map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{item.mistake}</h4>
                      <Badge 
                        variant={item.severity === 'critical' ? 'destructive' : 
                                item.severity === 'high' ? 'default' : 'secondary'}
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-red-600">
                        <DollarSign className="h-4 w-4" />
                        <span>Potential Cost: {item.cost}</span>
                      </div>
                      <div className="flex items-start gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4 mt-0.5" />
                        <span>Solution: {item.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}