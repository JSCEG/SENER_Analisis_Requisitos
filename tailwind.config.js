/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
    './src/**/*.{css,js}'
  ],
  theme: {
    extend: {
      colors: {
        sener: {
          guinda: '#9B2247',
          'guinda-dark': '#7A1B38',
          verde: '#1E5B4F',
          dorado: '#A57F2C',
          niebla: '#F5F1EC',
          tinta: '#243746'
        }
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
        body: ['Noto Sans', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px rgba(36, 55, 70, 0.10)',
        panel: '0 20px 60px rgba(36, 55, 70, 0.14)'
      },
      borderRadius: {
        shell: '28px'
      }
    }
  },
  plugins: []
};
