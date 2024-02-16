import { Component, JSX } from 'solid-js';
import ErrorParagraph from './ErrorParagraph';

export type InputProps = {
    name: string;
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
    label: string;
    value: string | undefined;
    error: string;
    required?: boolean;
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
    onChange: JSX.EventHandler<HTMLInputElement, Event>;
    onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

const Input: Component<InputProps> = (props) => {
    return (
        <>
            <label
                for={props.name}
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {props.label} {props.required && <span>*</span>}
            </label>
            <input
                {...props}
                id={props.name}
                value={props.value || ''}
                aria-invalid={!!props.error}
                aria-errormessage={`${props.name}-error`}
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            {props.error && <ErrorParagraph error={props.error} />}
        </>
    );
};

export default Input;