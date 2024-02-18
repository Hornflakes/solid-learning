import * as i18n from '@solid-primitives/i18n';
import * as en from '../assets/i18n/en.json';
import {
    Accessor,
    Component,
    JSX,
    Suspense,
    createContext,
    createEffect,
    createResource,
    createSignal,
    useContext,
} from 'solid-js';

export enum Locale {
    en = 'en',
    ro = 'ro',
}
export type RawDictionary = typeof en;
export type Dictionary = i18n.Flatten<RawDictionary>;

const fetchDictionary = async (locale: Locale): Promise<Dictionary> => {
    const dict: RawDictionary = await import(`../assets/i18n/${locale}.json`);
    return i18n.flatten(dict);
};

const getPrefferedLanguage = (): Locale | undefined => {
    const languages = navigator.languages as Locale[];
    return languages.find((lang) => Object.values(Locale).includes(lang));
};

type I18nState = {
    locale: Accessor<Locale>;
    setLocale: (locale: Locale) => void;
    t: i18n.Translator<Dictionary>;
};

const I18nContext = createContext<I18nState>();

type I18nProviderProps = {
    children: JSX.Element;
};
export const I18nProvider: Component<I18nProviderProps> = (props) => {
    const initialLocale = JSON.parse(
        localStorage.getItem('locale') ?? `"${getPrefferedLanguage()}"` ?? '"en"',
    );
    const [locale, setLocale] = createSignal<Locale>(initialLocale);
    createEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('locale', JSON.stringify(locale()));
        });
    });

    const [dict] = createResource(locale, fetchDictionary, { initialValue: i18n.flatten(en) });

    const t = i18n.translator(dict, i18n.resolveTemplate);
    const store: I18nState = {
        locale,
        setLocale,
        t,
    };

    return (
        <Suspense>
            <I18nContext.Provider value={store}>{props.children}</I18nContext.Provider>
        </Suspense>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within a I18NProvider');
    }
    return context;
};
