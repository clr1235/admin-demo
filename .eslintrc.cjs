/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier/skip-formatting'],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        // 组件命名规则
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', '404', '403']
            }
        ]
    }
}
