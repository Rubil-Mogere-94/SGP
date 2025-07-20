/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF',     // brighter dodger blue
        'primary-hover': '#1C86EE',
        secondary: '#32CD32',   // vivid lime green
        'secondary-hover': '#2EB82E',
        accent: '#FF2D55',      // bold pink accent
        'accent-hover': '#E52B4F',
        background: '#FFFFFF',  // true white for contrast
        surface: '#F3F4F6',     // light gray surface
        info: '#0CA5E9',        // info blue
        success: '#22C55E',     // tailwind emerald
        warning: '#F59E0B',     // amber
        error: '#EF4444'        // red-500
      },
      boxShadow: {
        neu: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)'
      },
      backdropBlur: {
        xs: '4px',
        sm: '6px'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          primary: '#1E90FF',
          'primary-focus': '#1C86EE',
          secondary: '#32CD32',
          'secondary-focus': '#2EB82E',
          accent: '#FF2D55',
          'accent-focus': '#E52B4F',
          neutral: '#374151',
          'neutral-focus': '#1F2937',
          'base-100': '#FFFFFF',
          info: '#0CA5E9',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444'
        }
      }
    ]
  }
};
