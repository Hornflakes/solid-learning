import { Suspense, type Component } from 'solid-js';
import { Spinner } from './Spinner';
import { ChildrenProps } from '@types';

export const LazyChildren: Component<ChildrenProps> = (props) => {
    return <Suspense fallback={<Spinner />}>{props.children}</Suspense>;
};
