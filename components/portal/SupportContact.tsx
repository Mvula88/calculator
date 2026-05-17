'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, Clock, ArrowUpRight } from 'lucide-react'

const WHATSAPP = '264836757958'
const SUPPORT_EMAIL = 'support@impota.com'

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+264 83 675 7958',
    sub: 'Fastest — replies within hours.',
  },
  {
    icon: Mail,
    label: 'Email',
    value: SUPPORT_EMAIL,
    sub: 'Reply within 24 hours.',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Fri · 08:00–18:00 WAT',
    sub: 'Weekends closed.',
  },
]

const helpWith = [
  'Understanding the import process',
  'Using the calculator correctly',
  'Interpreting documents and forms',
  'Country-specific requirements',
  'General import questions',
]

export default function SupportContact() {
  return (
    <Card className="overflow-hidden bg-white border-zinc-200 shadow-none rounded-2xl">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-200">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-4">
          <span className="text-amber-600">Support</span>
          <span className="h-px flex-1 max-w-[40px] bg-zinc-200" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
          Need help?
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Get answers from someone who has actually imported a car.
        </p>
      </div>

      {/* Channels */}
      <div className="divide-y divide-zinc-200">
        {channels.map((c, i) => (
          <div key={c.label} className="p-6 sm:p-8 flex items-start gap-5">
            <div className="flex-shrink-0 w-12">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                Nº 0{i + 1}
              </div>
              <c.icon className="mt-3 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-1">
                {c.label}
              </p>
              <p className="font-serif text-lg font-medium tracking-tight text-zinc-900 break-all">
                {c.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-6 sm:p-8 border-t border-zinc-200 bg-stone-50/40">
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I need help with my IMPOTA import.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full h-11 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full">
              <MessageCircle className="mr-2 h-4 w-4" strokeWidth={1.75} />
              WhatsApp us
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=IMPOTA%20portal%20support`} className="flex-1">
            <Button variant="outline" className="w-full h-11 border-zinc-300 bg-white hover:bg-stone-50 font-medium rounded-full text-zinc-900">
              <Mail className="mr-2 h-4 w-4" strokeWidth={1.75} />
              Email us
            </Button>
          </a>
        </div>

        {/* What we help with */}
        <div className="mt-6 pt-6 border-t border-zinc-200">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3 flex items-center gap-2">
            <span aria-hidden>↳</span>
            What we help with
          </p>
          <ul className="space-y-1.5">
            {helpWith.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
