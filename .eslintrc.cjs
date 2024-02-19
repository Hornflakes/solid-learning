module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'solid', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:solid/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        'import/no-duplicates': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        // forbid usage of unused variables (marked with an _)
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['parameter', 'variable'],
                leadingUnderscore: 'forbid',
                filter: {
                    // keep this one open for destructuring
                    regex: '_*',
                    match: false,
                },
                format: null,
            },
            {
                selector: 'parameter',
                leadingUnderscore: 'require',
                format: null,
                modifiers: ['unused'],
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['../*', './../*'],
            },
        ],
    },
};
