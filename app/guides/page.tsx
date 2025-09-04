'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  Download,
  ChevronRight,
  Info
} from 'lucide-react'
import Link from 'next/link'

export default function GuidesPage() {
  const guides = [
    {
      id: 'japan-import',
      title: 'Complete Guide to Importing from Japan',
      description: 'Everything you need to know about importing vehicles from Japanese auctions',
      icon: Ship,
      color: 'bg-blue-500',
      topics: [
        'How to buy from auctions',
        'Inspection reports explained',
        'Shipping options & costs',
        'Required documentation'
      ]
    },
    {
      id: 'documents',
      title: 'Required Documents & Paperwork',
      description: 'Complete list of documents needed for smooth import clearance',
      icon: FileText,
      color: 'bg-purple-500',
      topics: [
        'Bill of Lading',
        'Export Certificate',
        'Insurance documents',
        'Customs forms'
      ]
    },
    {
      id: 'clearing',
      title: 'Customs Clearing Process',
      description: 'Step-by-step guide through the customs clearing process',
      icon: Shield,
      color: 'bg-green-500',
      topics: [
        'Pre-clearance preparation',
        'Port procedures',
        'Duty calculations',
        'Final registration'
      ]
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Import Guides & Resources</h1>
          <p className="text-gray-600 mt-1">Step-by-step guides based on 38+ successful vehicle imports.</p>
        </div>
        <Tabs defaultValue="all-guides" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-xl">
            <TabsTrigger value="all-guides">All Guides</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="all-guides">
            <div className="grid gap-6">
              {guides.map((guide) => (
                <Card key={guide.id} id={guide.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`${guide.color} p-3 rounded-lg`}>
                          <guide.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{guide.title}</CardTitle>
                          <CardDescription className="mt-2">{guide.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {guide.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full md:w-auto">
                      Read Full Guide <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-start">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Start Guide</CardTitle>
                <CardDescription>Get started with your first import in 5 simple steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: 1, title: 'Choose Your Vehicle', desc: 'Research and select from Japanese auctions' },
                  { step: 2, title: 'Calculate Costs', desc: 'Use our calculator for accurate estimates' },
                  { step: 3, title: 'Arrange Shipping', desc: 'Choose between RoRo or container shipping' },
                  { step: 4, title: 'Clear Customs', desc: 'Work with verified agents for smooth clearance' },
                  { step: 5, title: 'Register Vehicle', desc: 'Complete registration and get on the road' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Cost Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Container sharing strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Timing your imports for best rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Negotiating with agents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Common Pitfalls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Hidden auction fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Storage charges at port</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">Documentation errors</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Download Section */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Download Complete Import Guide PDF</h3>
                  <p className="text-gray-600 mb-4">
                    50+ pages of detailed instructions, checklists, and insider tips
                  </p>
                  <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download PDF Guide
                  </Button>
                </div>
                <BookOpen className="h-32 w-32 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}