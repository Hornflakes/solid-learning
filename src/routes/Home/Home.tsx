import { Component } from 'solid-js';
import logo from '../../assets/logo.svg';

const HomePage: Component = () => {
    return (
        <header class="flex flex-grow flex-col items-center justify-center gap-6">
            <img src={logo} class={'pointer-events-none h-48 animate-spin-slow'} alt="logo" />
            <p class="text-2xl">
                edit <code>src/routes/Home/Home.tsx</code> and save to reload.
            </p>
            <a
                class="text-4xl text-blue-500 hover:text-blue-300"
                href="https://github.com/solidjs/solid"
                target="_blank"
                rel="noopener noreferrer"
            >
                learn solid
            </a>
        </header>
    );
};

export default HomePage;
