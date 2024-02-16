import { Component } from 'solid-js';

export type CountryCardProps = {
    title: string;
    content: string;
    flagSrc: string;
};

const CountryCard: Component<CountryCardProps> = (props) => {
    return (
        <div class="flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a>
                <img class="rounded-t-lg" src={props.flagSrc} alt={props.content} />
            </a>
            <div class="flex flex-grow flex-col p-5">
                <a>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.title}
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.content}</p>
                <div class="flex flex-grow">
                    <a
                        href="#"
                        class="inline-flex items-center self-end rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg
                            class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
