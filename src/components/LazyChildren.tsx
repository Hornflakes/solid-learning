import { Suspense, type Component, JSX } from 'solid-js';
import { Spinner } from './Spinner';

export type LazyChildrenProps = {
    children: JSX.Element;
};
export const LazyChildren: Component<LazyChildrenProps> = (props) => {
    return <Suspense fallback={<Spinner />}>{props.children}</Suspense>;
};
