/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin infinite 20s linear',
            },
        },
    },
};

module.exports = config;
