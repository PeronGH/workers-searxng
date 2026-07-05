import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['node_modules/', 'dist/', 'worker-configuration.d.ts'],
	},
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.serviceworker,
				...globals.node,
			},
		},
	},
	{
		files: ['eslint.config.mjs'],
		languageOptions: {
			globals: globals.node,
		},
	},
]);
