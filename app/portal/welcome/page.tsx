import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ payment_status?: string; session_id?: string }>
}) {
  const params = await searchParams
  const paymentStatus = params.payment_status
  const sessionId = params.session_id

  // If payment successful, go to portal
  if (paymentStatus === 'success') {
    redirect('/portal')
  }

  // Check if user is logged in
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // User logged in, go to portal
    redirect('/portal')
  } else if (sessionId) {
    // Have session but no user, go to register
    redirect(`/auth/register?session_id=${sessionId}&payment_status=${paymentStatus || ''}`)
  } else {
    // No user and no session, go to login
    redirect('/auth/login')
  }
}