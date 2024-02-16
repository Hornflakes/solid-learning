import { createForm, required } from '@modular-forms/solid';
import { Component, ErrorBoundary, For, createResource, createSignal } from 'solid-js';
import Input from '../../components/Input';
import ErrorParagraph from '../../components/ErrorParagraph';
import { Country } from '../../types/country';
import CountryCard from '../../components/CountryCard';
import Sorter, { Sort } from '../../components/Sorter';

type FormValues = {
    name: string;
};

const Search: Component = () => {
    const [, { Form, Field }] = createForm<FormValues>();
    const [name, setName] = createSignal<string>();
    const [loading, setLoading] = createSignal<boolean>(false);

    const fetchCountries = async (name: string): Promise<Country[]> => {
        setLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`).finally(() =>
            setLoading(false),
        );

        if (res.status === 404) return [];
        return res.json();
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

            <Sorter disabled={!countries()?.length} onSort={sortCountries} />

            <ErrorBoundary fallback={<ErrorParagraph error="something went wrong..." />}>
                <div class="mt-4 flex flex-wrap gap-4">
                    <For each={countries()} fallback={countries() && 'no results ...'}>
                        {(country) => (
                            <CountryCard
                                title={country.name.official}
                                content={country.flags.alt || ''}
                                flagSrc={country.flags.svg}
                            />
                        )}
                    </For>
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default Search;
