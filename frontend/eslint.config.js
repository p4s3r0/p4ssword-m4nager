import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'object-curly-spacing': ['error', 'always'],
      'no-console': 'warn',
      semi: ['error', 'always'],
    }
  }
];