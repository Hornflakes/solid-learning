import { Suspense, type Component, JSX } from 'solid-js';
import Spinner from './Spinner';

export type LazyChildrenProps = {
    children: JSX.Element;
};
const LazyChildren: Component<LazyChildrenProps> = (props) => {
    return <Suspense fallback={<Spinner />}>{props.children}</Suspense>;
};

export default LazyChildren;
