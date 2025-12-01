import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/app.vue',
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-secondary': 'var(--accent-secondary)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        glass: 'var(--glass)',
        outline: 'var(--outline)',
        'outline-strong': 'var(--outline-strong)',
        'text-strong': 'var(--text-strong)',
        'text-muted': 'var(--text-muted)'
      },
      fontFamily: {
        sans: [
          '"Space Grotesk"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif'
        ]
      },
      boxShadow: {
        elevated: '0 25px 60px rgba(2, 6, 23, 0.65)'
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)'
      }
    }
  }
} satisfies Config
