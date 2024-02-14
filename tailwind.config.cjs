/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin infinite 20s linear',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
    darkMode: 'class',
};

module.exports = config;
