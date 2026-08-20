/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#090A0C',
          900: '#0D0E11',
          850: '#121418',
          800: '#171920',
          750: '#1C1F28',
          700: '#232733',
          600: '#2E3344',
          500: '#40465A',
        },
        stone: {
          900: '#1A1918',
          800: '#262422',
          700: '#383531',
          400: '#8C887F',
          300: '#B8B3A8',
          200: '#DDD8CE',
          100: '#EDE9E1',
          50: '#F7F5F0',
        },
        terracotta: {
          900: '#4D1D13',
          800: '#752E1E',
          700: '#9C3E28',
          600: '#B84E34',
          500: '#C36B4E', // Primary restrained warm accent
          400: '#D2856C',
          300: '#E1A28F',
          200: '#ECC3B6',
          100: '#F6E3DD',
        },
        olive: {
          800: '#2E3326',
          700: '#424A37',
          600: '#58634B',
          500: '#707D5F',
          400: '#8A9777',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        luxury: '0.18em',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'glow-terracotta': '0 0 30px -5px rgba(195, 107, 78, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
