import { RouteSectionProps } from '@solidjs/router';
import { Component } from 'solid-js';
import Nav from './Nav';

const Layout: Component<RouteSectionProps> = (props) => {
    return (
        <div class="flex h-screen flex-col">
            <Nav />
            <div class="flex flex-grow p-4">{props.children}</div>
        </div>
    );
};

export default Layout;
