/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'main-under-nav': 'calc(100vh - 64px)',
        'no-scrollbar': 'calc(100% - 20px)'
      }
    },
  },
  plugins: [],
}
