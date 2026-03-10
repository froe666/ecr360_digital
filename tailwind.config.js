/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1628',
        secondary: '#1E3A5F',
        accent: '#00C2FF',
        accent2: '#0066CC',
        bg: '#070E1A',
        fg: '#F0F4FF',
        muted: '#6B7FA3',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      animation: {
        'float-y': 'floatY 6s ease-in-out infinite',
        'float-y2': 'floatY2 8s ease-in-out infinite',
        'blob-morph': 'blobMorph 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scan-line': 'scanLine 4s linear infinite',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(0, 102, 204, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 194, 255, 0.1) 0%, transparent 50%), #070E1A',
        'accent-gradient': 'linear-gradient(135deg, #00C2FF 0%, #0066CC 100%)',
      },
      maxWidth: {
        '8xl': '1280px',
      },
    },
  },
  plugins: [],
};