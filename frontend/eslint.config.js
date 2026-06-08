import pluginVue from 'eslint-plugin-vue';
import requirePropsPrefix from './eslint/require-props-prefix.js';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      local: {
        rules: {
          'require-props-prefix-in-template': requirePropsPrefix,
        },
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'object-curly-spacing': ['error', 'always'],
      'no-console': 'warn',
      semi: ['error', 'always'],

      'local/require-props-prefix-in-template': 'error',
    },
  },
];