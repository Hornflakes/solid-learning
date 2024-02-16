import { createForm, required } from '@modular-forms/solid';
import { Component, ErrorBoundary, For, createResource, createSignal } from 'solid-js';
import Input from '../../components/Input';
import ErrorParagraph from '../../components/ErrorParagraph';
import { Country } from '../../types/country';
import CountryCard from '../../components/CountryCard';
import Sorter, { Sort } from '../../components/Sorter';
import { getCountries } from '../../apis/country';

type FormValues = {
    name: string;
};

const SearchPage: Component = () => {
    const [, { Form, Field }] = createForm<FormValues>();
    const [name, setName] = createSignal<string>();
    const [loading, setLoading] = createSignal<boolean>(false);

    const fetchCountries = async (name: string): Promise<Country[]> => {
        setLoading(true);
        return getCountries(name).finally(() => setLoading(false));
    };
    const [countries, { mutate: mutateCountries, refetch: refetchCountries }] = createResource(
        name,
        fetchCountries,
    );

    const sortCountries = (sort: Sort): void => {
        const og = countries();
        if (!og) return;

        if (sort === 'none') {
            refetchCountries();
            return;
        }

        const ret = sort === 'asc' ? 1 : -1;
        const sorted = og.toSorted((a, b) => (a.name.official > b.name.official ? ret : -ret));

        mutateCountries(sorted);
    };

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                search
            </h1>

            <div class="mb-3">
                <Form
                    onSubmit={(vals) => {
                        setName(vals.name);
                    }}
                >
                    <Field name="name" validate={[required('please enter a country name.')]}>
                        {(field, props) => {
                            return (
                                <div class="w-96">
                                    <Input
                                        {...props}
                                        type="text"
                                        label="search countries:"
                                        value={field.value}
                                        error={field.error}
                                        loading={loading()}
                                    />
                                </div>
                            );
                        }}
                    </Field>
                </Form>
            </div>

            <Sorter disabled={(countries()?.length ?? 0) < 2} onSort={sortCountries} />

            <ErrorBoundary fallback={<ErrorParagraph error="something went wrong..." />}>
                <div class="mt-4 flex flex-wrap gap-4">
                    <For each={countries()} fallback={countries() && 'no results ...'}>
                        {(country) => {
                            return (
                                <CountryCard
                                    title={country.name.official}
                                    content={country.flags.alt || ''}
                                    flagSrc={country.flags.svg}
                                    cioc={country.cioc}
                                    variant="search"
                                />
                            );
                        }}
                    </For>
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default SearchPage;
