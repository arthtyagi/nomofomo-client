module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ea542a',
        secondary: '#ff4081',
        tertiary: '#ffeb3b',
        quaternary: '#ffc107',
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
};
