/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        accent: '#EF4444',
        background: '#F8F8F8',
        surface: '#FFFFFF',
        text: '#1F2937',
        secondaryText: '#6B7280',
        success: '#10B981',
        error: '#EF4444',
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
};
