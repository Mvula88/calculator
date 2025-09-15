import { Metadata } from 'next'
import { generateCountryMetadata } from '@/lib/seo/metadata'
import StructuredData from '@/components/seo/StructuredData'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Calculator, 
  FileText, 
  Users, 
  Ship, 
  CheckCircle,
  TrendingDown,
  Clock,
  Shield,
  Star,
  ArrowRight,
  DollarSign,
  Package,
  Award
} from 'lucide-react'
import Image from 'next/image'

type CountryCode = 'na' | 'za' | 'bw' | 'zm'

interface PageProps {
  params: Promise<{
    country: CountryCode
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  return generateCountryMetadata(country)
}

export async function generateStaticParams() {
  return [
    { country: 'na' },
    { country: 'za' },
    { country: 'bw' },
    { country: 'zm' },
  ]
}

const countryData = {
  na: {
    name: 'Namibia',
    flag: '🇳🇦',
    currency: 'N$',
    port: 'Walvis Bay',
    avgSavings: '75,000',
    members: 'Real Experience',
    dutyRate: '25-45%',
    clearingTime: '7-14 days',
    popularCars: ['Toyota Hilux', 'Toyota Fortuner', 'Nissan NP300', 'Ford Ranger'],
    keyBenefits: [
      'No age restriction on vehicle imports',
      'SACU member - simplified customs process',
      'Strong Japanese car market presence',
      'Established clearing agent network'
    ],
    testimonial: null as null | { name: string; location: string; saving: string; car: string; text: string }
  },
  za: {
    name: 'South Africa',
    flag: '🇿🇦',
    currency: 'R',
    port: 'Durban',
    avgSavings: '120,000',
    members: 'Real Experience',
    dutyRate: '30-48%',
    clearingTime: '10-21 days',
    popularCars: ['Toyota Hilux', 'VW Polo', 'Toyota Corolla', 'Ford Ranger'],
    keyBenefits: [
      'Largest port facilities in Africa',
      'Well-established import infrastructure',
      'Multiple financing options available',
      'Strong regulatory framework'
    ],
    testimonial: null as null | { name: string; location: string; saving: string; car: string; text: string }
  },
  bw: {
    name: 'Botswana',
    flag: '🇧🇼',
    currency: 'P',
    port: 'via Durban/Walvis Bay',
    avgSavings: '65,000',
    members: 'Real Experience',
    dutyRate: '25-40%',
    clearingTime: '14-21 days',
    popularCars: ['Toyota Hilux', 'Land Cruiser', 'Nissan Navara', 'Mazda BT-50'],
    keyBenefits: [
      'SACU member benefits',
      'Growing import market',
      'Simplified documentation',
      'Lower duty rates than neighbors'
    ],
    testimonial: null as null | { name: string; location: string; saving: string; car: string; text: string }
  },
  zm: {
    name: 'Zambia',
    flag: '🇿🇲',
    currency: 'K',
    port: 'via Dar es Salaam',
    avgSavings: '180,000',
    members: 'Real Experience',
    dutyRate: '30-50%',
    clearingTime: '14-28 days',
    popularCars: ['Toyota Hilux', 'Toyota Vitz', 'Nissan X-Trail', 'Honda Fit'],
    keyBenefits: [
      'High potential savings',
      'Growing middle class market',
      'Improving import processes',
      'Multiple border entry points'
    ],
    testimonial: null as null | { name: string; location: string; saving: string; car: string; text: string }
  }
}

export default async function CountryLandingPage({ params }: PageProps) {
  const { country: countryCode } = await params
  const country = countryData[countryCode]
  
  if (!country) {
    return <div>Country not found</div>
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with strong H1 */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">{country.members}+ Successful Importers</span>
            </div>
            
            {/* Strong H1 with primary keywords */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Import Cars to {country.name} from Japan
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Save {country.currency}{country.avgSavings} Per Vehicle
              </span>
            </h1>
            
            {/* Strong H2 with secondary keywords */}
            <h2 className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Complete {country.name} car import guide with duty calculator, documentation templates, 
              and step-by-step customs clearance process for {country.port}
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/register?country=${countryCode}&package=mastery`}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Import Costs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${countryCode}/guide`}>
                <Button size="lg" variant="outline">
                  <FileText className="mr-2 h-5 w-5" />
                  View Free Import Guide
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            <Card className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{country.currency}{country.avgSavings}</div>
              <div className="text-sm text-gray-600">Average Savings</div>
            </Card>
            <Card className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{country.members}+</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </Card>
            <Card className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{country.clearingTime}</div>
              <div className="text-sm text-gray-600">Clearance Time</div>
            </Card>
            <Card className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{country.dutyRate}</div>
              <div className="text-sm text-gray-600">Duty Rates</div>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Why Import Cars to {country.name} from Japan?
              </h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Importing cars directly from Japan to {country.name} offers significant cost savings 
                  compared to buying from local dealerships. With average savings of {country.currency}{country.avgSavings} 
                  per vehicle, the import process pays for itself many times over.
                </p>
                <p className="mb-4">
                  Japanese vehicles are known for their reliability, low mileage, and excellent maintenance 
                  records. The {country.name} market has embraced Japanese imports, with {country.port} serving 
                  as the primary entry point for vehicles.
                </p>
                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Key Benefits for {country.name} Importers:
                </h4>
                <ul className="space-y-2">
                  {country.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6">
                Popular Cars to Import to {country.name}
              </h3>
              <div className="space-y-4 mb-8">
                {country.popularCars.map((car, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">{car}</span>
                      </div>
                      <span className="text-sm text-gray-600">High demand</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Testimonial */}
              {country.testimonial ? (
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="flex items-start gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{country.testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{country.testimonial.name}</div>
                      <div className="text-sm text-gray-600">{country.testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Saved</div>
                      <div className="font-bold text-green-600">{country.testimonial.saving}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-600">Vehicle: {country.testimonial.car}</span>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-lg mb-2">Real Success Stories Coming Soon</h3>
                      <p className="text-gray-600">We're collecting verified testimonials from our growing community of successful imports</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {country.name} Car Import Process - Step by Step
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-3">Step 1</div>
              <h3 className="font-bold text-xl mb-2">Find & Purchase</h3>
              <p className="text-gray-600 mb-4">
                Search Japan auction sites, calculate total landed cost in {country.currency}, 
                and purchase through verified agents.
              </p>
              <Link href={`/${countryCode}/japan-auctions`}>
                <Button variant="link" className="p-0">
                  Learn about Japan auctions →
                </Button>
              </Link>
            </Card>

            <Card className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-3">Step 2</div>
              <h3 className="font-bold text-xl mb-2">Ship to {country.port}</h3>
              <p className="text-gray-600 mb-4">
                Arrange shipping via RoRo or container. Track your vehicle during the 
                {country.name === 'Zambia' ? ' journey via Dar es Salaam' : ` ${country.clearingTime} journey`}.
              </p>
              <Link href={`/${countryCode}/shipping-guide`}>
                <Button variant="link" className="p-0">
                  View shipping options →
                </Button>
              </Link>
            </Card>

            <Card className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-3">Step 3</div>
              <h3 className="font-bold text-xl mb-2">Clear & Register</h3>
              <p className="text-gray-600 mb-4">
                Clear customs at {country.port}, pay duties ({country.dutyRate}), 
                and register with local authorities.
              </p>
              <Link href={`/${countryCode}/documentation`}>
                <Button variant="link" className="p-0">
                  Get documentation templates →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start Importing Cars to {country.name} Today
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our growing community - {country.members} successful imports
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/register?country=${countryCode}&package=mastery`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Award className="mr-2 h-5 w-5" />
                Get Import Mastery - {country.currency}1,999
              </Button>
            </Link>
            <Link href={`/register?country=${countryCode}&package=mistake`}>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Start with Mistake Guide - {country.currency}499
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-blue-200">
            ⚡ Instant access • 💰 Secure checkout • 📞 Local support
          </p>
        </div>
      </section>

      {/* Structured Data for this page */}
      <StructuredData 
        type="howto" 
        data={{
          title: `How to Import a Car from Japan to ${country.name}`,
          description: `Complete guide to importing vehicles from Japan to ${country.name} through ${country.port}`
        }}
      />
      <StructuredData 
        type="product" 
        data={{
          name: `${country.name} Import Guide`,
          description: `Professional car import guide for ${country.name}`,
          price: "499",
          currency: country.currency.replace('$', 'NAD')
        }}
      />
    </main>
  )
}