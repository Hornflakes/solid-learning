import { Component } from 'solid-js';
import { useI18n } from '@contexts';

export const ProtectedPage: Component = () => {
    const { t } = useI18n();

    return (
        <p class="flex flex-grow items-center justify-center text-2xl text-gray-900 dark:text-white">
            {t('routes.protected_route.im_protected')}
        </p>
    );
};
