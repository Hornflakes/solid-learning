import { useAuth } from '@contexts';
import { useNavigate } from '@solidjs/router';
import { ChildrenProps } from '@types';
import { Component, createEffect } from 'solid-js';

export const ProtectedRoute: Component<ChildrenProps> = (props) => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    createEffect(() => {
        if (!auth()) {
            navigate('/', { replace: true });
        }
    });

    return <>{props.children}</>;
};
