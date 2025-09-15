import { redirect } from 'next/navigation'

// Server-side redirect - more reliable than client-side
export default function PackagesPage() {
  redirect('/portal')
}