import { RouteSectionProps, createAsync, useNavigate } from '@solidjs/router';
import { Component, Suspense, For, ErrorBoundary } from 'solid-js';
import { getCountry } from '../../../data/country';
import Spinner from '../../../components/Spinner';
import CountryCard from '../../../components/CountryCard';

const CountryPage: Component<RouteSectionProps> = (props: RouteSectionProps) => {
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
                <For each={countries()} fallback={countries() && '404 not found'}>
                    {(country) => {
                        return (
                            <div>
                                <CountryCard
                                    title={country.name.official}
                                    content={country.flags.alt || ''}
                                    flagSrc={country.flags.svg}
                                    cioc={country.cioc}
                                    variant="country"
                                />
                            </div>
                        );
                    }}
                </For>
            </Suspense>
        </ErrorBoundary>
    );
};

export default CountryPage;