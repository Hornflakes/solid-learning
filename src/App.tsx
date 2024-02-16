import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import Layout from './components/Layout';
import HomePage from './routes/home/home';
import SearchPage from './routes/search/search';
import LazyChildren from './components/LazyChildren';
import CountryPage from './routes/country/[cioc]/country';

const LazyPage = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes/lazy/lazy');
});

const App: Component = () => {
    return (
        <Router root={Layout}>
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/country/:cioc" component={CountryPage} />;
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
