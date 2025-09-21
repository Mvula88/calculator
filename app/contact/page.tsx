'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Clock,
  MapPin,
  Send,
  MessageCircle,
  Phone,
  Globe,
  Sparkles,
  Star,
  CheckCircle,
  Headphones,
  Zap,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [activeOffice, setActiveOffice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    // Rotate active office every 3 seconds
    const interval = setInterval(() => {
      setActiveOffice((prev) => (prev + 1) % 2)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      const mailtoLink = `mailto:info@impota.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
      window.location.href = mailtoLink
      setIsSubmitting(false)
      toast.success('Opening your email client...')
    }, 1000)
  }

  const offices = [
    {
      title: 'US Office',
      lines: [
        '8195, 1021 E Lincolnway',
        'Cheyenne, WY, Laramie',
        'US, 82001'
      ],
      color: 'from-blue-500 to-indigo-500',
      icon: '🇺🇸'
    },
    {
      title: 'Namibian Office',
      lines: [
        'Independence Avenue',
        'Windhoek, Namibia'
      ],
      color: 'from-green-500 to-emerald-500',
      icon: '🇳🇦'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-6000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent h-96"></div>
        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Hero Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounceIn shadow-lg">
              <MessageCircle className="h-4 w-4 animate-pulse" />
              We're Here to Help
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent animate-fadeInUp">
              Contact Us
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
              Have questions about importing cars? Need help with your account?
              We're here to help you succeed in your import journey.
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center animate-fadeInUp animation-delay-400">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
              <div className="text-center animate-fadeInUp animation-delay-600">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">&lt;2h</div>
                <div className="text-sm text-gray-500">Response</div>
              </div>
              <div className="text-center animate-fadeInUp animation-delay-800">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="grid gap-6">
              <Card
                className="relative p-6 hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-300 group overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      Email
                      {hoveredCard === 0 && <Zap className="h-4 w-4 text-blue-500 animate-pulse" />}
                    </h3>
                    <p className="text-gray-600 font-medium">info@impota.com</p>
                    <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      Usually responds within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className="relative p-6 hover:shadow-2xl transition-all duration-500 border-2 hover:border-purple-300 group overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      Support Hours
                      {hoveredCard === 1 && <Headphones className="h-4 w-4 text-purple-500 animate-pulse" />}
                    </h3>
                    <p className="text-gray-600">Monday - Friday: 8AM - 6PM CAT</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 rounded-lg inline-flex">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full absolute"></div>
                      <span className="text-sm text-green-700 font-medium ml-1">Currently Open</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                  <Globe className="h-5 w-5" />
                </div>
                Our Global Offices
              </h2>

              <div className="grid gap-6">
                {offices.map((office, index) => (
                  <Card
                    key={index}
                    className={`relative p-6 transition-all duration-700 cursor-pointer overflow-hidden transform ${
                      activeOffice === index
                        ? 'ring-2 ring-offset-2 ring-blue-500 shadow-2xl scale-105'
                        : 'hover:shadow-xl hover:scale-102'
                    }`}
                    onClick={() => setActiveOffice(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r ${office.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="relative flex items-start gap-4">
                      <div className={`p-4 bg-gradient-to-br ${office.color} rounded-2xl text-white text-3xl shadow-lg transform ${
                        activeOffice === index ? 'rotate-6 scale-110' : 'group-hover:rotate-3'
                      } transition-all duration-300`}>
                        {office.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <MapPin className={`h-4 w-4 ${activeOffice === index ? 'text-blue-600 animate-bounce' : 'text-gray-400'}`} />
                          {office.title}
                          {activeOffice === index && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              Active
                            </span>
                          )}
                        </h3>
                        <div className="space-y-1">
                          {office.lines.map((line, i) => (
                            <p key={i} className={`text-gray-600 transition-colors duration-300 ${
                              activeOffice === index ? 'text-gray-800 font-medium' : ''
                            }`}>{line}</p>
                          ))}
                        </div>
                      </div>
                      {activeOffice === index && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="h-6 w-6 text-blue-600 animate-scaleIn" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Why Choose Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">24h</div>
                  <div className="text-sm text-gray-600 mt-1">Response Time</div>
                  <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Support Rate</div>
                  <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="relative p-8 shadow-2xl border-2 overflow-hidden group hover:border-purple-200 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white animate-pulse">
                      <Send className="h-5 w-5" />
                    </div>
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">We'll get back to you as soon as possible</p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-blue-600 transition-colors">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-4 pr-10 py-3 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
                        placeholder="Your name"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Star className={`h-4 w-4 transition-colors duration-300 ${
                          formData.name ? 'text-blue-500' : 'text-gray-300'
                        }`} />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-blue-600 transition-colors">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-4 pr-10 py-3 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
                        placeholder="your@email.com"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Mail className={`h-4 w-4 transition-colors duration-300 ${
                          formData.email ? 'text-blue-500' : 'text-gray-300'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-blue-600 transition-colors">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="pl-4 py-3 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-blue-600 transition-colors">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="pl-4 py-3 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-xs transition-colors duration-300 ${
                      formData.message.length > 400 ? 'text-orange-500' : 'text-gray-500'
                    }`}>
                      {formData.message.length}/500 characters
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-8 rounded-full transition-all duration-300 ${
                            i < Math.floor(formData.message.length / 100)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </span>
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-1 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Fast Response</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-1 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Secure</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-1 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                      <Headphones className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">24/7 Support</span>
                  </div>
                </div>
              </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(30px, -30px) scale(1.05) rotate(1deg);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95) rotate(-1deg);
          }
          75% {
            transform: translate(20px, -10px) scale(1.02) rotate(1deg);
          }
        }
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          70% {
            transform: scale(0.9) translateY(0);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}