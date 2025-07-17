import checkFile from 'eslint-plugin-check-file';
import { projectStructurePlugin } from 'eslint-plugin-project-structure';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default {
   ignores: ['dist'],
   files: ['**/*.{ts,tsx}'],
   languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
         projectService: true,
      },
   },
   plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'check-file': checkFile,
      'react-compiler': reactCompiler,
      'project-structure': projectStructurePlugin,
   },
   settings: {
      'project-structure/independent-modules-config-path':
         'independentModules.json',
   },
   rules: {
      // react-compiler
      'react-compiler/react-compiler': 'error',
      // custom rules
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',

      'check-file/filename-naming-convention': [
         'error',
         {
            '**/*.{ts,tsx}': 'KEBAB_CASE',
         },
         {
            ignoreMiddleExtensions: true,
         },
      ],
      'check-file/folder-naming-convention': [
         'error',
         {
            'src/**': 'KEBAB_CASE',
         },
      ],
      'react-refresh/only-export-components': [
         'warn',
         { allowConstantExport: true },
      ],
      // project-structure
      'project-structure/independent-modules': 'error',
      ...reactHooks.configs.recommended.rules,
   },
};
