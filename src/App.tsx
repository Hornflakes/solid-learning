import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import Layout from './components/Layout';
import Home from './routes/Home/Home';
import LazyChildren from './components/LazyChildren';

const Lazy = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes/Lazy/Lazy');
});
const LazyRoute = () => (
    <LazyChildren>
        <Lazy />
    </LazyChildren>
);

const App: Component = () => {
    return (
        <Router root={Layout}>
            <Route path="/" component={Home} />
            <Route path="/lazy" component={LazyRoute} />
        </Router>
    );
};

export default App;
