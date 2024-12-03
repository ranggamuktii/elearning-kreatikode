import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js', flowbite.content()],
  theme: {
    extend: {
      colors: {
        'primary-600': '#004FA2',
        'primary-500': '#0089E2',
        'primary-400': '#3BB1ED',
        'primary-300': '#62CDF6',
        'primary-200': '#97E6FC',
        'primary-100': '#CAF5FD',
        'secondary-500': '#0A2C50',
        'secondary-400': '#336896',
        'secondary-300': '#609ECA',
        'secondary-200': '#9ACEED',
        'secondary-100': '#CBE8F6',
      },
      boxShadow: {
        'custom-light': '0 1px 8px rgba(0, 0, 0, 0.06)',
        'custom-mild': '0 1px 8px rgba(0, 0, 0, 0.02)',
      },
      textShadow: {
        'custom-light': '0 1px 8px rgba(0, 0, 0, 0.06)',
        'custom-dark': '2px 2px 10px rgba(0, 0, 0, 0.5)',
      },
      scale: {
        102: '1.02',
      },
      backgroundImage: {
        'gradation-blue': 'linear-gradient(to right, #0089E2, #62CDF6)',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
