import { redirect } from 'next/navigation'

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ payment_status?: string; session_id?: string }>
}) {
  const params = await searchParams

  // Always redirect to portal when payment is successful
  // The portal itself will handle auth checks
  if (params.payment_status === 'success') {
    redirect('/portal')
  }

  // For any other case, redirect based on session_id
  if (params.session_id) {
    redirect(`/auth/register?session_id=${params.session_id}&payment_status=${params.payment_status || ''}`)
  }

  // Default redirect to login
  redirect('/auth/login')
}