import { Component } from 'solid-js';
import logo from '@assets/logo.svg';
import { useI18n } from '@contexts';

export const HomePage: Component = () => {
    const { t } = useI18n();

    return (
        <header class="flex flex-grow flex-col items-center justify-center gap-6">
            <img src={logo} class={'pointer-events-none h-48 animate-spin-slow'} alt="logo" />
            <p class="text-2xl text-gray-900 dark:text-white">
                {t('routes.home.description', { path: 'src/routes/home/home.tsx' })}
            </p>
            <a
                class="text-4xl text-blue-500 hover:text-blue-300"
                href="https://github.com/solidjs/solid"
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('routes.home.learn_solid')}
            </a>
        </header>
    );
};
