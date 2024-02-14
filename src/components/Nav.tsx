import { Component, createMemo } from 'solid-js';
import logo from '../assets/logo.svg';
import { useLocation } from '@solidjs/router';

const Nav: Component = () => {
    return (
        <nav class="border-gray-200 bg-white dark:bg-gray-900">
            <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <a
                    target="_blank"
                    href="https://github.com/solidjs/solid"
                    class="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src={logo} class="h-8" alt="logo" />
                    <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                        solid-learning
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span class="sr-only">open main menu</span>
                    <svg
                        class="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                        <li>
                            <NavLink name="home" href="/" />
                        </li>
                        <li>
                            <NavLink name="lazy route" href="/lazy" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavLink: Component<{ name: string; href: string }> = (props) => {
    const location = useLocation();
    const isActive = createMemo(() => {
        return location.pathname === props.href;
    });

    const activeClasses =
        'bg-blue-700 text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500';
    const inactiveClasses =
        'text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500';

    return (
        <a
            href={props.href}
            class={`block rounded px-3 py-2 md:p-0 ${isActive() ? activeClasses : inactiveClasses}`}
            aria-current={isActive() ? 'page' : undefined}
        >
            {props.name}
        </a>
    );
};

export default Nav;
