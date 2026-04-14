import js from '@eslint/js';

export default [
    {
        ignores: ['node_modules/**', 'images/**', 'css/**']
    },
    js.configs.recommended,
    {
        files: ['js/app.js', 'js/modules/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                navigator: 'readonly',
                Audio: 'readonly',
                SpeechSynthesisUtterance: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                console: 'readonly',
                fetch: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
        }
    },
    {
        files: ['js/core/**/*.js', 'tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly'
            }
        }
    },
    {
        files: ['scripts/**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                process: 'readonly',
                Buffer: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                fetch: 'readonly',
                console: 'readonly'
            }
        }
    },
    {
        files: ['**/*.test.js'],
        languageOptions: {
            sourceType: 'module'
        }
    }
];
