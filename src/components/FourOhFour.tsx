import { useI18n } from '@contexts';
import { Component } from 'solid-js';

export const FourOhFour: Component = () => {
    const { t } = useI18n();

    return (
        <p class="flex flex-grow items-center justify-center text-2xl text-gray-900 dark:text-white">
            {t('global.404')}
        </p>
    );
};
