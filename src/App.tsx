import { lazy, type Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import LazyChildren from './components/LazyChildren';

const Home = lazy(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return import('./routes/Home/Home');
});
const LazyHome = () => (
    <LazyChildren>
        <Home />
    </LazyChildren>
);

const App: Component = () => {
    return (
        <Router>
            <Route path="/" component={LazyHome} />
        </Router>
    );
};

export default App;
