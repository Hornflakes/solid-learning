import flowbite from 'flowbite/plugin';
import { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin infinite 20s linear',
            },
        },
    },
    plugins: [flowbite],
    darkMode: 'class',
} satisfies Config;
