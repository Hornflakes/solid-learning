import { Component } from 'solid-js';

export type ErrorParagraphProps = {
    error: string;
};

const ErrorParagraph: Component<ErrorParagraphProps> = (props) => {
    return <p class="m mt-2 text-sm font-medium text-red-600 dark:text-red-500">{props.error}</p>;
};

export default ErrorParagraph;
