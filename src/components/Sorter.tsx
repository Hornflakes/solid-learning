import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';

export type Sort = 'asc' | 'desc' | 'none';

export type SorterProps = {
    disabled?: boolean;
    onSort: (sort: Sort) => void;
};

const Sorter: Component<SorterProps> = (props) => {
    const [sort, setSort] = createSignal<Sort>('none');

    createEffect(() => {
        if (props.disabled) {
            setSort('none');
        }
    });

    const onSort = () => {
        if (sort() === 'none') {
            setSort('asc');
        } else if (sort() === 'asc') {
            setSort('desc');
        } else {
            setSort('none');
        }
        props.onSort(sort());
    };

    return (
        <button
            disabled={props.disabled}
            type="button"
            class="inline-flex h-max items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onSort}
        >
            Sort
            <div role="status">
                <Switch>
                    <Match when={sort() === 'none'}>
                        <svg
                            class="h-6 w-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m8 15 4 4 4-4m0-6-4-4-4 4"
                            />
                        </svg>
                        <span class="sr-only">no sort</span>
                    </Match>
                    <Match when={sort() === 'asc'}>
                        <svg
                            class="h-6 w-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m16 14-4-4-4 4"
                            />
                        </svg>
                        <span class="sr-only">ascending sort</span>
                    </Match>
                    <Match when={sort() === 'desc'}>
                        <svg
                            class="h-6 w-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m8 10 4 4 4-4"
                            />
                        </svg>
                        <span class="sr-only">descending sort</span>
                    </Match>
                </Switch>
            </div>
        </button>
    );
};

export default Sorter;