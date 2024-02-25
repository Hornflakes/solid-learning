import {
    Accessor,
    Component,
    createContext,
    createEffect,
    createSignal,
    onMount,
    useContext,
} from 'solid-js';
import { ChildrenProps } from '@types';

type ThemeState = {
    dark: Accessor<boolean>;
    setDark: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeState>();

export const ThemeProvider: Component<ChildrenProps> = (props) => {
    const initialDark = JSON.parse(
        localStorage.getItem('dark') ??
            window.matchMedia('(prefers-color-scheme: dark)').matches.toString(),
    );
    const [dark, setDark] = createSignal<boolean>(initialDark);

    const htmlElement = document.documentElement;
    createEffect(() => {
        htmlElement.classList.toggle('dark', dark());
    });

    onMount(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('dark', JSON.stringify(dark()));
        });
    });

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>{props.children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
