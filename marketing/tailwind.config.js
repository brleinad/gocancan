// tailwind.config.js
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#475569',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
