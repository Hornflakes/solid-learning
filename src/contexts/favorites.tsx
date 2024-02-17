import { Component, JSX, createContext, createEffect, useContext } from 'solid-js';
import { Country } from '../types/country';
import { createStore, produce } from 'solid-js/store';

export type CountryWithCioc = Country & { cioc: string };
type FavoritesStore = {
    favorites: Record<string, CountryWithCioc>;
    toggle: (country: CountryWithCioc) => void;
};
const FavoritesContext = createContext<FavoritesStore>();

type FavoritesProviderProps = {
    children: JSX.Element;
};
export const FavoritesProvider: Component<FavoritesProviderProps> = (props) => {
    const localStorageFavorites = JSON.parse(localStorage?.getItem('favorites') ?? '{}');
    const [favorites, setFavorites] =
        createStore<Record<string, CountryWithCioc>>(localStorageFavorites);
    createEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    const toggle = (country: CountryWithCioc): void => {
        setFavorites(
            produce((favs) => {
                if (!favs[country.cioc]) {
                    favs[country.cioc] = country;
                } else {
                    delete favs[country.cioc];
                }
            }),
        );
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
