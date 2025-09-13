import { redirect } from 'next/navigation'

export default function PackagesPage() {
  // Immediately redirect to portal
  // The portal will handle showing the right content based on user's access
  redirect('/portal')
}