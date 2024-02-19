import { createForm, required, reset, setValue } from '@modular-forms/solid';
import { Component, For, createEffect, createSignal, Show } from 'solid-js';
import { Country } from '@types';
import { getCountries } from '@data/country';
import { createAsync, useSearchParams } from '@solidjs/router';
import { CountryCard, Input, Sort, Sorter } from '@components';
import { useI18n } from '@contexts';

type FormValues = {
    name: string;
};

type SearchPageSearchParams = {
    name: string;
};

export const SearchPage: Component = () => {
    const { t } = useI18n();
    const [form, { Form, Field }] = createForm<FormValues>();
    const [countries, setCountries] = createSignal<Country[] | undefined>();
    const [loading, setLoading] = createSignal<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams<SearchPageSearchParams>();
    createEffect(() => {
        reset(form);
        setValue(form, 'name', searchParams.name ?? '');
    });

    const fetchCountries = async (name: string | undefined): Promise<Country[]> => {
        if (!name) return [];

        setLoading(true);
        return getCountries(name).finally(() => setLoading(false));
    };
    const fetchedCountries = createAsync(() => fetchCountries(searchParams.name));
    createEffect(() => {
        setCountries(fetchedCountries());
    });

    const sortCountries = (sort: Sort): void => {
        const og = countries();
        if (!og) return;

        if (sort === 'none') {
            setCountries(fetchedCountries());
            return;
        }

        const ret = sort === 'asc' ? 1 : -1;
        const sorted = og.toSorted((a, b) => (a.name.official > b.name.official ? ret : -ret));

        setCountries(sorted);
    };

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                {t('routes.search.search')}
            </h1>

            <div class="mb-3">
                <Form
                    onSubmit={(vals) => {
                        setSearchParams({ name: vals.name });
                    }}
                >
                    <Field
                        name="name"
                        validate={[required(t('routes.search.please_enter_a_country'))]}
                    >
                        {(field, props) => {
                            return (
                                <div class="w-96">
                                    <Input
                                        {...props}
                                        type="text"
                                        label={t('routes.search.search_countries')}
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

            <Show when={!loading()}>
                <div class="mt-4 flex flex-wrap gap-4">
                    <For
                        each={countries()}
                        fallback={searchParams.name && <>{t('routes.search.no_results')}</>}
                    >
                        {(country) => {
                            return <CountryCard country={country} variant="search" />;
                        }}
                    </For>
                </div>
            </Show>
        </div>
    );
};
