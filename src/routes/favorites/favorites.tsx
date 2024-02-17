import { Component, For } from 'solid-js';
import { useFavorites } from '../../contexts/favorites';
import { CountryCard } from '../../components';

const FavoritesPage: Component = () => {
    const { favorites } = useFavorites();

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                favorites
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

export default FavoritesPage;
