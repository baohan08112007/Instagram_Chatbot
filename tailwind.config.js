/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ig: {
          primary: '#0095f6',
          'primary-hover': '#1877f2',
          ink: '#262626',
          body: '#8e8e8e',
          mute: '#c7c7c7',
          canvas: '#ffffff',
          'canvas-soft': '#fafafa',
          border: '#dbdbdb',
          'border-strong': '#a8a8a8',
          destructive: '#ed4956',
          success: '#78de45',
          link: '#00376b',
          overlay: 'rgba(0, 0, 0, 0.6)',
        },
      },
      fontFamily: {
        system: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'fs-ig-title': ['28px', { lineHeight: '32px', fontWeight: '300' }],
        'fs-ig-username': ['14px', { lineHeight: '18px', fontWeight: '600' }],
        'fs-ig-body': ['14px', { lineHeight: '18px', fontWeight: '400' }],
        'fs-ig-caption': ['12px', { lineHeight: '14px', fontWeight: '400' }],
        'fs-ig-caption-strong': ['12px', { lineHeight: '14px', fontWeight: '600' }],
        'fs-ig-button': ['14px', { lineHeight: '18px', fontWeight: '600' }],
        'fs-ig-input': ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        'ig-md': '8px',
        'ig-lg': '12px',
        'ig-xl': '16px',
        'ig-pill': '26px',
        'ig-avatar': '50%',
        'ig-input': '3px',
      },
      spacing: {
        'ig-post-gap': '12px',
        'ig-icon-gap': '16px',
      },
      height: {
        'ig-nav': '54px',
        'ig-tab': '44px',
      },
    },
  },
  plugins: [],
}
