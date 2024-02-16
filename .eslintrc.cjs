module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'solid'],
    extends: [
        'eslint:recommended',
        'plugin:solid/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
};
