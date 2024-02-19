import { useNavigate } from '@solidjs/router';
import { Component, Match, Show, Switch } from 'solid-js';
import { CountryWithCioc, useFavorites, useI18n } from '../contexts';
import { Country } from '../types';

type FavoriteButtonProps = {
    country: CountryWithCioc;
};
const FavoriteButton: Component<FavoriteButtonProps> = (props) => {
    const { t } = useI18n();
    const { favorites, toggle } = useFavorites();

    return (
        <button
            class="inline-flex items-center self-end rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => toggle(props.country)}
        >
            <Show
                when={favorites[props.country.cioc]}
                fallback={
                    <>
                        <svg
                            class="h-5 w-5 text-white"
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
                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                            />
                        </svg>
                        <span class="sr-only">{t('components.country_card.add_to_favorites')}</span>
                    </>
                }
            >
                <>
                    <svg
                        class="h-5 w-5 text-pink-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                    </svg>
                    <span class="sr-only">
                        {t('components.country_card.remove_from_favorites')}
                    </span>
                </>
            </Show>
        </button>
    );
};

export type CountryCardProps = {
    country: Country;
    variant: 'search' | 'country' | 'favorite';
};
export const CountryCard: Component<CountryCardProps> = (props) => {
    const navigate = useNavigate();
    const { t } = useI18n();

    return (
        <div class="flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a>
                <img
                    class="rounded-t-lg"
                    src={props.country.flags.svg}
                    alt={props.country.flags.alt}
                />
            </a>
            <div class="flex flex-grow flex-col p-5">
                <a>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.country.name.official}
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {props.country.flags.alt}
                </p>

                <Switch>
                    <Match when={props.variant === 'search' && props.country.cioc}>
                        {(cioc) => {
                            return (
                                <div class="flex flex-grow gap-2">
                                    <FavoriteButton country={props.country as CountryWithCioc} />
                                    <a
                                        href={`/country/${cioc()}`}
                                        class="inline-flex items-center self-end rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {t('components.country_card.read_more')}
                                        <svg
                                            class="ms-2 h-3.5 w-3.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            );
                        }}
                    </Match>
                    <Match when={props.variant === 'country'}>
                        <div class="flex flex-grow gap-2">
                            <FavoriteButton country={props.country as CountryWithCioc} />
                            <button
                                onClick={() => navigate(-1)}
                                class="inline-flex items-center self-end rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {t('components.country_card.back')}
                                <svg
                                    class="ms-2 h-5 w-5 "
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
                                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                                    />
                                </svg>
                            </button>
                        </div>
                    </Match>
                    <Match when={props.variant === 'favorite'}>
                        <div class="flex flex-grow">
                            <FavoriteButton country={props.country as CountryWithCioc} />
                        </div>
                    </Match>
                </Switch>
            </div>
        </div>
    );
};
