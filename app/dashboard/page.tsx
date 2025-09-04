'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  TrendingUp,
  DollarSign,
  Car,
  Clock,
  ArrowRight,
  Calculator,
  FileText,
  Users,
  Ship,
  ChevronUp,
  ChevronDown,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { Price } from '@/components/ui/Price'

export default function DashboardPage() {
  const [calculations] = useState(12)
  const [savedAmount] = useState(45000 * 12)
  const [avgCost] = useState(185000)

  const stats = [
    {
      title: 'Total Savings',
      value: <Price nadAmount={savedAmount} />,
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Calculations Made',
      value: calculations,
      change: '+5',
      trend: 'up',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Import Cost',
      value: <Price nadAmount={avgCost} />,
      change: '-12%',
      trend: 'down',
      icon: Car,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Time Saved',
      value: '48 hours',
      change: '+8h',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentActivity = [
    {
      type: 'calculation',
      title: '2018 Toyota Prius',
      description: 'Import cost calculated',
      time: '2 hours ago',
      icon: Calculator,
      color: 'text-blue-600'
    },
    {
      type: 'guide',
      title: 'Shipping Options Guide',
      description: 'Guide accessed',
      time: '5 hours ago',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      type: 'agent',
      title: 'ProClear Logistics',
      description: 'Agent contacted',
      time: 'Yesterday',
      icon: Users,
      color: 'text-green-600'
    }
  ]

  const popularRoutes = [
    {
      from: 'Yokohama',
      to: 'Walvis Bay',
      duration: '35-40 days',
      cost: 'From N$18,000',
      availability: 'High'
    },
    {
      from: 'Nagoya',
      to: 'Durban',
      duration: '30-35 days',
      cost: 'From N$16,500',
      availability: 'Medium'
    },
    {
      from: 'Tokyo',
      to: 'Dar es Salaam',
      duration: '28-32 days',
      cost: 'From N$15,000',
      availability: 'High'
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your import overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="gap-1">
                    {stat.trend === 'up' ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest platform interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-between" variant="outline">
                  <Link href="/calculator">
                    Calculate Import Cost
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild className="w-full justify-between" variant="outline">
                  <Link href="/agents">
                    Find Clearing Agent
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild className="w-full justify-between" variant="outline">
                  <Link href="/guides">
                    Read Import Guides
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild className="w-full justify-between" variant="outline">
                  <Link href="/container-sharing">
                    Shipping Routes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shipping Routes */}
        <Card className="border-0 shadow-sm mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Popular Shipping Routes</CardTitle>
                <CardDescription>Most used Japan to SADC routes</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/container-sharing">
                  View All Routes
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-medium text-gray-700">Route</th>
                    <th className="pb-3 font-medium text-gray-700">Duration</th>
                    <th className="pb-3 font-medium text-gray-700">Est. Cost</th>
                    <th className="pb-3 font-medium text-gray-700">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {popularRoutes.map((route, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Ship className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{route.from} → {route.to}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">{route.duration}</td>
                      <td className="py-3 text-gray-600">{route.cost}</td>
                      <td className="py-3">
                        <Badge variant={route.availability === 'High' ? 'default' : 'secondary'}>
                          {route.availability}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <Card className="border-0 shadow-sm mt-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Pro Tip</h3>
                <p className="text-gray-600 text-sm">
                  Save up to 60% on shipping costs by using container sharing for your next import. 
                  Check our shipping routes section to find available options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}