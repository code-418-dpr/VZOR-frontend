/** @type {import('stylelint').Config} */
const stylelintConfig = {
    extends: ["stylelint-config-recommended", "stylelint-config-tailwindcss"],
    rules: {
        "at-rule-no-deprecated": [
            true,
            {
                ignoreAtRules: ["apply"],
            },
        ],
    },
};

export default stylelintConfig;
