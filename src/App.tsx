import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { Layout, LazyChildren } from './components';

import { loadCountry } from './data/country';
import { FavoritesProvider, I18nProvider } from './contexts';
import { CountryPage, FavoritesPage, HomePage, SearchPage } from './routes';

const LazyPage = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes').then((mod) => ({ default: mod.LazyPage }));
});

export const App: Component = () => {
    return (
        <I18nProvider>
            <FavoritesProvider>
                <Router root={Layout}>
                    <Route path="/" component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/country/:cioc" component={CountryPage} load={loadCountry} />;
                    <Route
                        path="/lazy"
                        component={() => (
                            <LazyChildren>
                                <LazyPage />
                            </LazyChildren>
                        )}
                    />
                </Router>
            </FavoritesProvider>
        </I18nProvider>
    );
};
