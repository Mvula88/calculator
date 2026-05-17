import { cn } from '@/lib/utils'

type WordmarkProps = {
  variant?: 'light' | 'dark'
  className?: string
}

export default function Wordmark({ variant = 'light', className }: WordmarkProps) {
  const textColor = variant === 'dark' ? 'text-stone-50' : 'text-zinc-950'
  return (
    <span
      aria-label="IMPOTA"
      className={cn(
        'inline-flex items-baseline font-black leading-none tracking-[-0.04em] select-none',
        textColor,
        className,
      )}
    >
      impota<span className="text-amber-400">.</span>
    </span>
  )
}
