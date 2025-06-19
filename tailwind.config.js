import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            screens: {
                'xl': '1440px',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                english: ['Poppins', 'Roboto', ...defaultTheme.fontFamily.sans],
                arabic: ['"Cairo"', '"Readex Pro"', '"Noto Sans"', 'sans-serif'],

            },
            colors: {
                'yellow-original': '#ffc50f'
            },
            animation: {
                'fadeup': 'fadeup 1s 0s both',
                'scaleup': 'scaleUp  0.8s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeup: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, 100%, 0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateZ(0)',
                    },
                },
                scaleUp: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.25)' },
                },
            },
        },
    },

    plugins: [forms],
};
