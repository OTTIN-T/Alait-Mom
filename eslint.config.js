// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  overrides: {
    vue: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/component-tags-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
    },
    javascript: {
      'no-console': 'warn',
      s,
    },
  },
})
