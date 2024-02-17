import { Component } from 'solid-js';

export type ErrorParagraphProps = {
    error: string;
};
export const ErrorParagraph: Component<ErrorParagraphProps> = (props) => {
    return <p class="m mt-2 text-sm font-medium text-red-600 dark:text-red-500">{props.error}</p>;
};
