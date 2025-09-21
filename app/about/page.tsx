'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Target,
  Globe,
  Shield,
  Users,
  Rocket,
  Heart,
  Award,
  BookOpen,
  Zap,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Star
} from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We believe in complete transparency in pricing and processes.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Knowledge is power. We educate rather than gatekeep information.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive community of importers helping each other succeed.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const features = [
    {
      icon: Globe,
      title: 'Experience',
      description: 'Over 5 years of real import experience providing real guidance across Southern Africa.',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Savings',
      description: 'Our members save significantly compared to local dealership prices.',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Support',
      description: 'Dedicated support team to guide you through every step of your import journey.',
      gradient: 'from-pink-400 to-purple-500'
    },
    {
      icon: Award,
      title: 'Success Rate',
      description: 'Our members successfully complete their imports with our comprehensive guidance.',
      gradient: 'from-blue-400 to-indigo-500'
    }
  ]

  const services = [
    { text: 'Comprehensive import guides tailored to each country', icon: CheckCircle },
    { text: 'Real-time duty and tax calculators', icon: CheckCircle },
    { text: 'Access to verified shipping agents and companies', icon: CheckCircle },
    { text: 'Japan auction house guidance and strategies', icon: CheckCircle },
    { text: 'Documentation templates and checklists', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="absolute inset-0">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Southern Africa's #1 Import Platform
              <Sparkles className="h-4 w-4" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
              About IMPOTA
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Empowering Southern Africans to import vehicles from Japan with confidence
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 text-white p-12 shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-xl leading-relaxed text-white/90">
                IMPOTA is Southern Africa's leading car import education platform. We empower individuals
                with comprehensive knowledge and tools to import vehicles from Japan safely, legally, and profitably.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          </Card>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide step-by-step guides, cost calculators, and expert insights that demystify the car
              import process. Our platform serves importers in Namibia, South Africa, Botswana, and Zambia.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {service.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IMPOTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IMPOTA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r ${feature.gradient} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden p-8 cursor-pointer transform transition-all duration-500 ${
                  activeValue === index ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-xl'
                }`}
                onClick={() => setActiveValue(index)}
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
                {activeValue === index && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-5`}></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-12 shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Import Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of successful importers across Southern Africa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/na/guide"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur text-white rounded-xl font-bold hover:bg-white/30 transition-all hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <Star className="absolute top-10 right-10 h-8 w-8 text-white/20 animate-pulse" />
            <Star className="absolute bottom-10 left-10 h-6 w-6 text-white/20 animate-pulse animation-delay-2000" />
            <Star className="absolute top-20 left-20 h-5 w-5 text-white/20 animate-pulse animation-delay-4000" />
          </Card>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}