import { useNavigate, useParams } from '@solidjs/router';
import { Component, Suspense, createResource, For, ErrorBoundary } from 'solid-js';
import { getCountry } from '../../../apis/country';
import Spinner from '../../../components/Spinner';
import CountryCard from '../../../components/CountryCard';

const CountryPage: Component = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [countries] = createResource(() => params.cioc, getCountry);

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
