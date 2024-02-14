import { Component } from 'solid-js';
import styles from './Home.module.css';
import logo from '../../assets/logo.svg';

const Home: Component = () => {
    return (
        <header class="flex min-h-screen flex-col items-center justify-center gap-6">
            <img src={logo} class={'animate-spin-slow pointer-events-none h-48'} alt="logo" />
            <p class="text-2xl">
                Edit <code>src/routes/Home/Home.tsx</code> and save to reload.
            </p>
            <a
                class="text-4xl text-blue-500 hover:text-blue-300"
                href="https://github.com/solidjs/solid"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn Solid
            </a>
        </header>
    );
};
export default Home;
