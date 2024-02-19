import { ChildrenProps } from '@types';
import { Accessor, Component, createContext, createSignal, useContext } from 'solid-js';

type AuthState = {
    auth: Accessor<boolean>;
    setAuth: (auth: boolean) => void;
};

const AuthContext = createContext<AuthState>();

export const AuthProvider: Component<ChildrenProps> = (props) => {
    const [auth, setAuth] = createSignal<boolean>(false);

    return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
