import { RouteSectionProps, createAsync, useNavigate } from '@solidjs/router';
import { Component, Suspense, For, ErrorBoundary } from 'solid-js';
import { CountryCard, Spinner } from '@components';
import { getCountry } from '@data/country';
import { useI18n } from '@contexts';

export const CountryPage: Component<RouteSectionProps> = (props: RouteSectionProps) => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const countries = createAsync(() => getCountry(props.params.cioc));

    return (
        <ErrorBoundary
            fallback={() => {
                navigate('/search');
                return <></>;
            }}
        >
            <Suspense fallback={<Spinner />}>
                <For each={countries()} fallback={countries() && <>{t('global.404')}</>}>
                    {(country) => {
                        return (
                            <div>
                                <CountryCard country={country} variant="country" />
                            </div>
                        );
                    }}
                </For>
            </Suspense>
        </ErrorBoundary>
    );
};
