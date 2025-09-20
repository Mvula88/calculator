// Modern Design System Constants
export const colors = {
  primary: {
    gradient: 'from-indigo-600 to-purple-600',
    hover: 'hover:from-indigo-700 hover:to-purple-700',
    text: 'text-indigo-600',
    bg: 'bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-200'
  },
  secondary: {
    gradient: 'from-purple-600 to-pink-600',
    hover: 'hover:from-purple-700 hover:to-pink-700',
    text: 'text-purple-600',
    bg: 'bg-purple-600',
    light: 'bg-purple-50',
    border: 'border-purple-200'
  },
  success: {
    text: 'text-green-600',
    bg: 'bg-green-500',
    light: 'bg-green-50',
    border: 'border-green-200'
  },
  neutral: {
    text: 'text-gray-600',
    heading: 'text-gray-900',
    light: 'bg-gray-50',
    border: 'border-gray-200'
  }
}

export const spacing = {
  section: 'py-16 sm:py-24',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  card: 'p-6 sm:p-8',
  compact: 'p-4 sm:p-6'
}

export const typography = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl sm:text-4xl font-bold',
  h3: 'text-2xl sm:text-3xl font-bold',
  h4: 'text-xl sm:text-2xl font-semibold',
  body: 'text-base sm:text-lg',
  small: 'text-sm',
  lead: 'text-lg sm:text-xl text-gray-600'
}

export const effects = {
  card: 'bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300',
  cardHover: 'hover:-translate-y-1',
  button: 'font-semibold shadow-sm hover:shadow-lg transition-all duration-200',
  gradient: 'bg-gradient-to-r',
  glassmorphism: 'backdrop-blur-md bg-white/80',
  glow: 'shadow-2xl'
}

export const animations = {
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom duration-500',
  scaleIn: 'animate-in zoom-in duration-500'
}