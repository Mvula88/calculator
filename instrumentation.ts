export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = async (
  error: { digest: string },
  request: {
    path: string
    method: string
    headers: { [key: string]: string }
  }
) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.captureException(error, {
      contexts: {
        request: {
          url: request.path,
          method: request.method,
          headers: request.headers,
        },
      },
    })
  }
}