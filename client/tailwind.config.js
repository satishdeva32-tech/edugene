/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f9f5fa',
                    100: '#f2eaf5',
                    200: '#e6d6eb',
                    300: '#d1b5d9',
                    400: '#b488c1',
                    500: '#945da5',
                    600: '#813588', // BYJU'S Primary Purple
                    700: '#6d2b73',
                    800: '#5c2561',
                    900: '#4e2251',
                    950: '#311033',
                },
                accent: {
                    DEFAULT: '#FFC527', // BYJU'S Yellow
                    50: '#fffceb',
                    100: '#fff7cc',
                    200: '#fff099',
                    300: '#ffe266',
                    400: '#ffd133',
                    500: '#ffc527',
                    600: '#e6b123',
                    700: '#bf931d',
                    800: '#997617',
                    900: '#7d6013',
                },
                secondary: {
                    DEFAULT: '#00D09C', // Success/Green
                }
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                }
            },
        },
    },
    plugins: [],
}
