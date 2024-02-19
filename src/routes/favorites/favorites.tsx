import { Component, For } from 'solid-js';
import { useFavorites, useI18n } from '@contexts';
import { CountryCard } from '@components';

export const FavoritesPage: Component = () => {
    const { t } = useI18n();
    const { favorites } = useFavorites();

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                {t('routes.favorites.favorites')}
            </h1>

            <div class="flex flex-wrap gap-4">
                <For each={Object.values(favorites)}>
                    {(fav) => {
                        return <CountryCard country={fav} variant="favorite" />;
                    }}
                </For>
            </div>
        </div>
    );
};
