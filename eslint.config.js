import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import _import from "eslint-plugin-import";
import spellcheck from "eslint-plugin-spellcheck";
import tseslint from 'typescript-eslint'
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from '@stylistic/eslint-plugin'

const compat = new FlatCompat();

const ignoreWords = [
    "Rect",
    "unobserve",
    "selectable",
    "Dropdown",
    "Cascader",
    "Sider",
    'whitespace',
    "xlyk",
    "appid",
    "appkey",
    "msg",
    "antd",
    "tseslint",
    "rainfull",
    "axios",
    "dayjs",
    "href",
    "Memoized",
    "Resize",
    "Readonly",
    "infocode",
    "adcode",
    "reporttime",
    "windpower",
    "winddirection",
    "dayweather",
    "nightweather",
    "daytemp",
    "nighttemp",
    "daywind",
    "nightwind",
    "daypower",
    "nightpower",
    "Gao",
    "dpr",
    "req",
    "gdaic",
    "gdoic",
    "ouov",
    "ovt",
    "Tooltip",
    "Enum",
    "pathname",
    "markdownit",
    "Chatbot",
    "dify",
    "Recharts",
    "Scrollbar",
    "dateread",
    "formatter",
];

export default tseslint.config(
    {
        ignores: [
            "dist/**/*",
            "script/**/*",
            "**/vite.config.ts",
            "**/index.html",
            "**/eslint.config.js",
            "src/vite-env.d.ts",
        ]
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 13,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                    globalReturn: false,
                    impliedStrict: true,
                },
            },
        },

        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...compat.extends("plugin:react/recommended"),
            ...compat.extends("plugin:import/recommended"),
            ...compat.extends("plugin:import/typescript"),
        ],

        plugins: {
            '@stylistic': stylistic,
            '@typescript-eslint': typescriptEslint,
            'react': react,
            'react-hooks': reactHooks,
            'import': _import,
            'spellcheck': spellcheck,
        },

        rules: {
            "array-bracket-spacing": ["error", "never"],

            "arrow-spacing": ["error", {
                "before": true,
                "after": true,
            }],

            "brace-style": ["error", "1tbs"],
            "camelcase": "error",

            "comma-dangle": ["error", {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
            }],

            "comma-spacing": "error",
            "comma-style": "error",
            "computed-property-spacing": "error",
            "consistent-this": ["error", "_this"],
            "curly": ["error", "all"],
            "eol-last": ["error", "always"],
            "func-call-spacing": "error",
            "indent": ["error", 2],
            "jsx-quotes": "error",
            "key-spacing": "error",
            "keyword-spacing": "error",
            "line-comment-position": "error",
            "lines-around-comment": "error",
            "lines-between-class-members": "error",

            "max-params": ["error", {
                "max": 8,
            }],

            "new-cap": "error",
            "no-alert": "error",
            "no-console": "error",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-label": "error",

            "no-extra-parens": ["error", "all", {
                "ignoreJSX": "multi-line",
            }],

            "no-labels": "error",
            "no-lonely-if": "error",

            "no-multi-spaces": ["error", {
                "ignoreEOLComments": true,
            }],

            "no-multi-assign": "error",
            "no-multiple-empty-lines": "error",
            "no-negated-condition": "error",
            "no-param-reassign": "error",
            "no-redeclare": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-shadow-restricted-names": "error",

            "no-trailing-spaces": ["error", {
                "ignoreComments": true,
            }],

            "no-useless-return": "error",
            "no-unneeded-ternary": "error",
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "require-await": "error",

            "space-before-function-paren": ["error", {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always",
            }],

            "space-infix-ops": "error",
            "object-curly-spacing": ["error", "always"],

            "generator-star-spacing": ["error", {
                "before": false,
                "after": true,
            }],

            "prefer-destructuring": ["error"],

            "max-len": ["error", {
                "code": 120,
                "ignoreUrls": true,
                "ignoreRegExpLiterals": true,
            }],

            "@stylistic/member-delimiter-style": "error",

            "@typescript-eslint/no-unused-vars": ["error", {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": false,
            }],

            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/prefer-enum-initializers": "error",
            "@typescript-eslint/no-explicit-any": ["off"],
            "react/jsx-no-undef": "error",
            "react/jsx-no-duplicate-props": "error",

            "react/self-closing-comp": ["error", {
                "component": true,
                "html": true,
            }],

            "react/jsx-tag-spacing": ["error", {
                "closingSlash": "never",
                "beforeSelfClosing": "always",
                "afterOpening": "never",
                "beforeClosing": "never",
            }],

            "react/no-array-index-key": ["error"],
            "react/jsx-props-no-multi-spaces": ["error"],

            "react/jsx-max-props-per-line": ["error", {
                "maximum": 3,
            }],

            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "error",
            "import/order": "error",
            "import/default": "off",
            "import/no-named-as-default-member": "off",
            "import/no-self-import": "error",
            "import/no-absolute-path": "error",
            "import/first": "error",
            "import/exports-last": "off",
            "import/newline-after-import": "error",
            "import/no-duplicates": ["error"],

            "spellcheck/spell-checker": ["error", {
                "comments": false,
                "strings": false,
                "templates": false,
                "identifiers": true,
                "lang": "en_US",
                "skipWords": ignoreWords,
                "skipIfMatch": ["http://[^s]*", "https://[^s]*"],
                "skipWordIfMatch": [],
                "minLength": 3,
            }],
        },

        settings: {
            "react": {
                "createClass": "createReactClass",
                "pragma": "React",
                "fragment": "Fragment",
                "version": "detect",
                "flowVersion": "0.53",
            },

            "propWrapperFunctions": ["forbidExtraProps", {
                "property": "freeze",
                "object": "Object",
            }, {
                "property": "myFavoriteWrapper",
            }, {
                "property": "forbidExtraProps",
                "exact": true,
            }],

            "componentWrapperFunctions": ["observer", {
                "property": "styled",
            }, {
                "property": "observer",
                "object": "Mobx",
            }, {
                "property": "observer",
                "object": "<pragma>",
            }],

            "formComponents": ["CustomForm", {
                "name": "Form",
                "formAttribute": "endpoint",
            }],

            "linkComponents": ["Hyperlink", {
                "name": "Link",
                "linkAttribute": "to",
            }],

            "import/parser": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },

            "import/resolver": {
                "typescript": {
                    "alwaysTryTypes": true,
                },
            },
        },
    },
);
