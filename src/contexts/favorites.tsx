import { Component, createContext, onMount, useContext } from 'solid-js';
import { Country, ChildrenProps } from '@types';
import { createStore } from 'solid-js/store';

export type CountryWithCioc = Country & { cioc: string };
type FavoritesStore = {
    favorites: Record<string, CountryWithCioc>;
    toggle: (country: CountryWithCioc) => void;
};
const FavoritesContext = createContext<FavoritesStore>();

export const FavoritesProvider: Component<ChildrenProps> = (props) => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favorites') ?? '{}');
    const [favorites, setFavorites] =
        createStore<Record<string, CountryWithCioc>>(localStorageFavorites);
    onMount(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    const toggle = (country: CountryWithCioc): void => {
        setFavorites((favs) => {
            if (!favs[country.cioc]) {
                return { ...favs, [country.cioc]: country };
            } else {
                return { ...favs, [country.cioc]: undefined };
            }
        });
    };

    const store: FavoritesStore = {
        favorites,
        toggle,
    };

    return <FavoritesContext.Provider value={store}>{props.children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
