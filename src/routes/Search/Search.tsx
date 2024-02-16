import { createForm, required } from '@modular-forms/solid';
import { Component, ErrorBoundary, For, Suspense, createResource, createSignal } from 'solid-js';
import Input from '../../components/Input';
import ErrorParagraph from '../../components/ErrorParagraph';
import Spinner from '../../components/Spinner';
import { Country } from '../../types/country';

type FormValues = {
    name: string;
};

const Search: Component = () => {
    const [, { Form, Field }] = createForm<FormValues>();
    const [name, setName] = createSignal<string>();
    const [countries] = createResource(name, fetchCountries);

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                search
            </h1>

            <Form onSubmit={(vals) => setName(vals.name)}>
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
                                />
                            </div>
                        );
                    }}
                </Field>
            </Form>

            <ErrorBoundary fallback={<ErrorParagraph error="something went wrong..." />}>
                <div class="mt-4">
                    <Suspense fallback={<Spinner />}>
                        <For each={countries()} fallback={countries() && 'no results ...'}>
                            {(country) => <div>{country.name.common}</div>}
                        </For>
                    </Suspense>
                </div>
            </ErrorBoundary>
        </div>
    );
};

const fetchCountries = async (name: string): Promise<Country[]> => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (res.status === 404) return [];
    return res.json();
};

export default Search;
