import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { FourOhFour, Layout, LazyChildren, ProtectedRoute } from './components';
import { loadCountry } from './data/country';
import { AuthProvider, FavoritesProvider, I18nProvider } from './contexts';
import { CountryPage, FavoritesPage, HomePage, ProtectedPage, SearchPage } from './routes';
import { ThemeProvider } from './contexts/theme';

const LazyPage = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes').then((mod) => ({ default: mod.LazyPage }));
});

export const App: Component = () => {
    return (
        <ThemeProvider>
            <I18nProvider>
                <FavoritesProvider>
                    <AuthProvider>
                        <Router root={Layout}>
                            <Route path="/" component={HomePage} />
                            <Route path="/search" component={SearchPage} />
                            <Route path="/favorites" component={FavoritesPage} />
                            <Route
                                path="/country/:cioc"
                                component={CountryPage}
                                load={loadCountry}
                            />
                            <Route
                                path="/lazy"
                                component={() => (
                                    <LazyChildren>
                                        <LazyPage />
                                    </LazyChildren>
                                )}
                            />
                            <Route
                                path="/protected"
                                component={() => (
                                    <ProtectedRoute>
                                        <ProtectedPage />
                                    </ProtectedRoute>
                                )}
                            />
                            <Route path="*" component={FourOhFour} />
                        </Router>
                    </AuthProvider>
                </FavoritesProvider>
            </I18nProvider>
        </ThemeProvider>
    );
};
