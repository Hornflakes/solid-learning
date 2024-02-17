import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { Layout } from './components';
import { LazyChildren } from './components';
import { loadCountry } from './data/country';
import { CountryPage, HomePage, SearchPage } from './routes';

const LazyPage = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes').then((mod) => ({ default: mod.LazyPage }));
});

const App: Component = () => {
    return (
        <Router root={Layout}>
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
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
    );
};

export default App;
