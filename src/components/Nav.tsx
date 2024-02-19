import { Component, createMemo, Show } from 'solid-js';
import logo from '@assets/logo.svg';
import { useLocation } from '@solidjs/router';
import { Locale, useAuth, useI18n, useTheme } from '@contexts';

type NavLinkProps = {
    name: string;
    href: string;
};
const NavLink: Component<NavLinkProps> = (props) => {
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

export const Nav: Component = () => {
    const { t, setLocale } = useI18n();
    const { dark, setDark } = useTheme();
    const { auth, setAuth } = useAuth();

    return (
        <nav class="border-gray-200 bg-white dark:bg-gray-900">
            <div class="flex flex-wrap items-center justify-between p-4">
                <a
                    target="_blank"
                    href="https://github.com/solidjs/solid"
                    class="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src={logo} class="h-8" alt="logo" />
                    <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                        {t('components.nav.title')}
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span class="sr-only">{t('components.nav.open_main_menu')}</span>
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
                    <ul class="mt-4 flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
                        <label class="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                value=""
                                class="peer sr-only"
                                onClick={() => setAuth(!auth())}
                            />
                            <div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full" />
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {auth()
                                    ? t('components.nav.logged_in')
                                    : t('components.nav.logged_out')}
                            </span>
                        </label>
                        <Show
                            when={!dark()}
                            fallback={
                                <button onClick={() => setDark(false)}>
                                    <svg
                                        class="h-6 w-6 text-white hover:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z"
                                        />
                                    </svg>
                                </button>
                            }
                        >
                            <button onClick={() => setDark(true)}>
                                <svg
                                    class="h-6 w-6 text-gray-800 hover:text-blue-700"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                    />
                                </svg>
                            </button>
                        </Show>
                        <button class="py-2" onClick={() => setLocale(Locale.ro)}>
                            <img class="h-6" src="https://flagcdn.com/ro.svg" />
                        </button>
                        <button class="py-2" onClick={() => setLocale(Locale.en)}>
                            <img class="h-6" src="https://flagcdn.com/us.svg" />
                        </button>
                        <li>
                            <NavLink name={t('components.nav.home')} href="/" />
                        </li>
                        <li>
                            <NavLink name={t('components.nav.search')} href="/search" />
                        </li>
                        <li>
                            <NavLink name={t('components.nav.favorites')} href="/favorites" />
                        </li>
                        <li>
                            <NavLink name={t('components.nav.lazy_route')} href="/lazy" />
                        </li>
                        <li>
                            <NavLink name={t('components.nav.protected_route')} href="/protected" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
