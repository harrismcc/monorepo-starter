/* eslint-disable max-lines */

/**
 * Common jsdoc formatting rules
 */
const JSDOC_RULES = {
  require: {
    ArrowFunctionExpression: false,
    ClassDeclaration: true,
    ClassExpression: true,
    FunctionDeclaration: true,
    FunctionExpression: true,
    MethodDefinition: true,
  },
  contexts: [
    {
      context: "TSPropertySignature",
      inlineCommentBlock: true,
    },
    "TSEnumDeclaration",
    "TSTypeAliasDeclaration",
    "FunctionDeclaration",
    "ClassDeclaration",
  ],
};

module.exports = {
  globals: {
    // Allow for self to be a mirror of window
    self: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:eslint-comments/recommended",
    "preact",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  plugins: [
    "import",
    "@typescript-eslint",
    "jsdoc",
    "react",
    "jsx-a11y",
    "react-hooks",
    "simple-import-sort",
    "unicorn",
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // //////// //
    // Disabled //
    // //////// //

    /** Handled by prettier */
    "comma-dangle": 0,
    "operator-linebreak": 0,
    "implicit-arrow-linebreak": 0,
    "@typescript-eslint/indent": 0,
    "object-curly-newline": 0,
    "template-curly-spacing": 0,
    "newline-per-chained-call": 0,
    "generator-star-spacing": 0,
    "computed-property-spacing": 0,
    "space-before-function-paren": 0,
    indent: 0,
    "function-paren-newline": 0,
    "no-confusing-arrow": 0,
    "no-multi-spaces": 0,
    "object-property-newline": 0,
    "brace-style": 0,

    /** handled by no-restricted-syntax */
    "guard-for-in": 0,

    /**
     * We prefer to use types instead of interfaces
     *
     * @see https://www.notion.so/transcend/Use-Type-instead-of-Interface-b3868d0885724b6894647018323a57b2
     */
    "@typescript-eslint/prefer-interface": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    // when we do use interfaces, they are often empty
    "@typescript-eslint/no-empty-interface": 0,

    /** Use import lint rules */
    "@typescript-eslint/no-var-requires": 0,

    /**
     * Sometimes its just fun to nest ternary....
     *
     * With prettier its not so bad. its best to avoid
     * super deeply nest ternary statements but doing and if else if else is not bad
     */
    "no-nested-ternary": 0,

    /** no types are required cuz we use typescript */
    "jsdoc/require-param-type": 0,
    "jsdoc/require-returns-type": 0,

    /** We use types instead of prop-types */
    "react/prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/require-default-props": 0,

    /** Disabled react rules */
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/heading-has-content": 0,

    /**
     * TS allows for public syntax in constructor to make a constructor
     * parameter assigned to the class instance. We use this often and so
     * the constructor is often empty
     */
    "no-useless-constructor": 0,

    /** Import rules we don't use */
    "import/no-named-as-default": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,

    /** We use @typescript-eslint */
    "no-use-before-define": 0,
    "no-shadow": 0,
    camelcase: 0,
    "no-var-requires": 0,
    "no-inferrable-types": 0,
    "unicorn/explicit-length-check": "error",

    // ///// //
    // Rules //
    // ///// //

    /** Enforce === instead of == */
    eqeqeq: ["error"],

    /**
     * Require class methods to call this. If you want a class
     * method to not use this, you can workaround the rule by using
     * arrow function syntax, i.e.
     *
     * `public myParam = () => []`
     */
    "class-methods-use-this": ["error"],

    /**
     * Type signatures should be combined if possible:
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
     */
    "@typescript-eslint/unified-signatures": ["error"],

    /**
     * Group overrides next to each other
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
     */
    "@typescript-eslint/adjacent-overload-signatures": ["error"],

    /**
     * Explicitly specify return types to functions. This improves type safety
     * and also allows compiler to optimize
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     * @see https://www.notion.so/transcend/4ef10ad243b746d9b2a84f8bb4a1b01a?v=8eb2ce8c21d54b43a916e7f93a563950&p=36b3bd33e054443084d2759537e6423b
     */
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 0,

    /** JSdoc Validation */
    "jsdoc/require-jsdoc": ["error", JSDOC_RULES],
    "jsdoc/check-types": ["error"],
    "jsdoc/check-param-names": ["error", { checkDestructured: false }],
    "jsdoc/require-returns": ["error"],
    "jsdoc/no-types": ["error"],
    "jsdoc/require-param": ["error", { checkDestructured: false }],
    "jsdoc/require-param-description": ["error"],
    "jsdoc/require-returns-description": ["error"],
    "jsdoc/require-hyphen-before-param-description": ["error"],
    "jsdoc/require-description": [
      "error",
      {
        contexts: JSDOC_RULES.contexts.map(
          (context) => context.context || context
        ),
      },
    ],

    /** Import validation */
    "import/imports-first": ["error"],
    "import/newline-after-import": ["error"],
    "import/no-dynamic-require": ["error"],
    "import/no-unresolved": ["error"],
    "import/no-webpack-loader-syntax": ["error"],

    /**
     * Console log statements are normally used in debugging.
     * Instead we should use event manager on backend, or create and
     * use a singleton logger instance in each class.
     *
     * As a workaround you can set `const logger = console` and run `logger.log()`
     */
    "no-console": ["error"],

    /** Use template strings for concatenation */
    "prefer-template": ["error"],

    /**
     * Limits on file size to make them digestible and
     *
     * Limit line length to make code accessible on smaller screens.
     */
    "max-len": ["error", 125, { comments: 150 }],

    /** Require curly brackets around newlines */
    curly: ["error"],

    /** Enforce consistent JSX quotes */
    "jsx-quotes": ["error", "prefer-double"],

    /** Accessibility on frontend react components */
    "jsx-a11y/aria-props": ["error"],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/mouse-events-have-key-events": ["error"],
    "jsx-a11y/role-has-required-aria-props": ["error"],
    "jsx-a11y/role-supports-aria-props": ["error"],

    /** React JSX Rules */
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", "tsx"] },
    ],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-no-target-blank": ["error"],
    "react/self-closing-comp": ["error"],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],

    /** Enforce hook rules */
    "react-hooks/rules-of-hooks": ["error"],

    /** Test for dangerously set HTML */
    "react/no-danger": ["error"],

    /** Ensure eslint-disable is not present when its not disabling any rule */
    "eslint-comments/no-unused-disable": ["error"],

    /** Arrow functions should have parentheses around inputs */
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],

    /** Max lines in a file */
    "max-lines": ["error", 350],

    /** Generator functions should call `yield` */
    "require-yield": ["error"],

    /** Prefer for-of to for loop (in general we prefer map/forEach over for of as well) */
    "@typescript-eslint/prefer-for-of": ["error"],

    /** Should not alias this to another command */
    "@typescript-eslint/no-this-alias": ["error"],

    /** Prevent use of global variables */
    "no-restricted-globals": ["error"],

    /** No unnecessary async statements on a function */
    "require-await": ["error"],

    /**
     * If there are more than 4 arguments in a function, it should be refactored
     * to have fewer arguments. The easiest way of doing this is to create an
     * "options" parameter that holds all of the missing parameters
     *
     * @see https://eslint.org/docs/rules/max-params
     */
    "max-params": ["error", 4],

    /**
     * Sort imports
     *
     * @see https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // TODO: https://github.com/benmosher/eslint-plugin-import/pull/1696 - Remove overrides,
    // PR is merging soon -- 9/2/2020
    "import/no-extraneous-dependencies": 0,

    // No unused imports or variables. Convenient for pre-commit hook.
    "@typescript-eslint/no-unused-vars": 2,

    // //////// //
    // Warnings //
    // //////// //

    /** We want to eventually turn this to an error */
    "@typescript-eslint/ban-types": ["warn"],

    /** Accessibility rules to fix TODO: https://github.com/transcend-io/main/issues/913 - error */
    "jsx-a11y/media-has-caption": ["warn"],
    "jsx-a11y/click-events-have-key-events": ["warn"],
    "jsx-a11y/no-static-element-interactions": ["warn"],

    /** We disagree with these rules that are configured by eslint-config-preact */
    "constructor-super": "off",
    "no-redeclare": "off",
    "no-duplicate-imports": "off",
    "no-undef": "off",
    "no-dupe-class-members": "off",
    "no-unused-vars": "off", // we already have this covered by typescript-eslint config
    "no-empty": ["error"],
    "no-empty-pattern": ["error"],
    "react/no-direct-mutation-state": ["error"],
    "react/display-name": "off",

    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "sinon",
            importNames: ["sinon", "default"],
            message: "Please use createSinonSandbox() instead",
          },
        ],
      },
    ],
  },
  overrides: [
    // ///////// //
    // overrides //
    // ///////// //
    /**
     * Functions folders have independent imports, so we need to override the
     * default settings.
     */
    {
      files: ["functions/*"],
      rules: {
        "import/no-unresolved": ["warn"],
      },
    },
    /**
     * Migrations
     */
    {
      files: ["backend-services/migration-runner/src/migrations/*"],
      rules: {
        // need to use module.exports
        "import/no-import-module-exports": 0,
      },
    },
    /**
     * Infra
     */
    {
      files: ["backend-support/pulumi-utils/**/*", "**/src/infra/*"],
      rules: {
        "no-new": 0,
      },
    },
    /**
     * Mocks are auto generated and often very large
     */
    {
      files: ["**/mocks.ts", "**/mocks/*", "**/fixtures/*"],
      rules: {
        "max-lines": 0,
        "max-len": 0,
        "no-tabs": 0,
      },
    },
    /**
     * Seeders use complex return types for the seed data
     */
    {
      files: ["**/seeders/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
        "class-methods-use-this": 0,
      },
    },
    /**
     * Integrations
     */
    {
      files: ["**/integrations/**/*.ts"],
      rules: {
        // postProcessRequestHandler does not
        "class-methods-use-this": 0,
        // export { default }
        "no-restricted-exports": 0,
      },
    },
    /**
     * Integration mock fixtures contain generated values and so
     * we allow the really long files/lines that are generated.
     */
    {
      files: ["**/integration-mocks/fixtures/**"],
      rules: {
        "max-lines": 0,
        "max-len": 0,
      },
    },
    /**
     * Hooks often modify the local parameters before saving and
     * so we allow param reassign. The parameters are also well defined
     * by their types and so the jsdoc comments are not needed
     */
    {
      files: ["**/hooks.ts"],
      rules: {
        "no-param-reassign": 0,
        "jsdoc/require-param": 0,
      },
    },
    /**
     * immer supports assignment syntax and mutation via proxy handler.set trap
     * and draft state which creates the *appearance* of parameter reassignment
     *
     * @see https://immerjs.github.io/immer/docs/introduction
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set
     */
    {
      files: ["**/reducer.ts", "**/slice.ts"],
      rules: {
        "no-param-reassign": 0,
        "no-void": 0,
      },
    },
    /**
     * Javascript files can ignore type requirements as we typically want to
     * migrate these js files to typescript at some point.
     */
    {
      files: ["*.js"],
      rules: {
        "jsdoc/no-types": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
    /**
     * Selector files have complex type functions and the types
     * are inferred all the way through. No need for jsdoc comments
     */
    {
      files: ["**/selectors.ts", "**/selectors.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
        "jsdoc/require-param": 0,
        "jsdoc/require-returns": 0,
      },
    },
    /**
     * Seed files often have really large types take from the remote id,
     * its often not worth the time documenting every field.
     */
    {
      files: ["**/seed.ts"],
      rules: {
        "jsdoc/require-jsdoc": [
          "error",
          {
            require: JSDOC_RULES.require,
            contexts: JSDOC_RULES.contexts.filter(
              (x) => x.context !== "TSPropertySignature"
            ),
          },
        ],
      },
    },
    /**
     * In test files, we allow them to be a bit longer than our
     * typically max-lines rule. In addition, nock has a lot of unassigned
     * values and often look unused when they are not.
     */
    {
      files: ["**/*.test.ts"],
      rules: {
        "no-unused-expressions": 0,
        // Give a bit more leeway in test files
        "max-lines": ["warn", 450],
      },
    },
    /**
     * Nock needs to use `function` syntax to access `this.`
     */
    {
      files: ["**/mocks/**"],
      rules: {
        "func-names": 0,
      },
    },
    /**
     * Daemon files are typed explicitly and so function
     * comments are a bit redundant
     */
    {
      files: ["**/daemon.ts"],
      rules: {
        "jsdoc/require-returns": 0,
        "jsdoc/require-param": 0,
      },
    },
    /**
     * These files are generated by the `sequelize-mixins` package.
     */
    {
      files: ["**/Base.ts"],
      rules: {
        "lines-between-class-members": 0,
        "max-lines": 0,
        "max-len": 0,
        "padded-blocks": 0,
        "no-extra-semi": 0,
      },
    },
    /**
     * We use underscore syntax for _global datapoint
     * and the functions are strongly typed some function
     * parameters and return types are redundant
     */
    {
      files: ["**/dataPoints.ts"],
      rules: {
        "no-underscore-dangle": 0,
        "jsdoc/require-returns": 0,
        "jsdoc/require-param": 0,
      },
    },
    /**
     * TSX files are all props and state so jsdoc
     * params and returns are often redundant
     */
    {
      files: ["**/*.tsx"],
      rules: {
        "jsdoc/require-returns": 0,
        "jsdoc/require-param": 0,
        "no-empty-pattern": 0,
      },
    },
    /**
     * These are react components but the props types are defined explicitly
     * and so the extra comment is almost always redundant
     */
    {
      files: ["**/wrappers.ts"],
      rules: {
        "jsdoc/require-param": 0,
        "jsdoc/require-returns": 0,
        "no-empty-pattern": 0,
      },
    },
    /**
     * Airgap.js project syntax restrictions:
     * - for..of is allowed. Be careful -- you must use explicit iterators:
     *   https://github.com/transcend-io/main/blob/dev/consent-manager/airgap.js/src/README.md#forof-without-explicit-iterator-reference
     * - No `with` statement
     * - No `label: { break: label; }`
     * - No `debugger` (can be disabled for debugging)
     * - Return assignment is fine. When used with ??=, return
     *   assignment can greatly simplify implementation
     *
     * Airgap also uses ++ and globals often
     */

    {
      files: ["**/consent-manager/**"],
      rules: {
        "no-restricted-syntax": [
          2,
          "DebuggerStatement",
          "ForInStatement",
          "LabeledStatement",
          "WithStatement",
        ],
        "no-restricted-globals": 0,
        "no-plusplus": 0,
        "no-return-assign": 0,
      },
    },
    /**
     * function names are not allowed in ag core:
     *
     * @see https://github.com/transcend-io/main/blob/dev/consent-manager/airgap.js/src/core/README.md#named-functions
     */
    {
      files: ["**/airgap.js/src/**"],
      rules: {
        "func-names": ["error", "never"],
        "unicorn/explicit-length-check": 0,
      },
    },
    {
      files: ["**/nrc/src/**"],
      rules: {
        "func-names": ["error", "never"],
      },
    },
    /**
     * Userscripts will have long inline data: URI resources and we
     * can't always include eslint directives in the top of userscripts.
     */
    {
      files: ["**/*.user.js"],
      rules: {
        "max-len": 0,
      },
    },
    /** `this` aliases are highly expected and usual in prototype patchers */
    {
      files: ["**/airgap.js/src/core/patchers/**"],
      rules: {
        "@typescript-eslint/no-this-alias": 0,
      },
    },
    /** Queue files have complex return types that should be inferred */
    {
      files: ["**/Queue.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
    /** GraphQL resolvers have params and returns that are well defined by types */
    {
      files: ["**/resolvers.ts"],
      rules: {
        "jsdoc/require-returns": 0,
        "jsdoc/require-param": 0,
        "no-empty-pattern": 0,
      },
    },
    {
      files: ["*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Anything not matched in another group.
              ["^"],
              // Transcend open source imports.
              ["^@transcend-io/"],
              // @main imports.
              ["^@main/"],
              // Relative imports.
              ["^\\."],
            ],
          },
        ],
      },
    },

    // ////////////// //
    // temp overrides //
    // ////////////// //

    /**
     * These files have messages strings that often are too long
     *
     * TODO: https://github.com/transcend-io/main/issues/2980 - move all to contentful
     */
    {
      files: ["**/templates.ts", "**/regexes.ts"],
      rules: {
        "max-len": 0,
      },
    },
    // stories can have custom parameters and don't need comments
    {
      files: ["**/*stories.tsx"],
      rules: {
        "jsdoc/require-jsdoc": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
    // serverless eslint rules
    {
      files: ["**/serverless.js"],
      rules: {
        "no-template-curly-in-string": 0,
      },
    },
  ],
  settings: {
    /** React settings based on version in monorepo */
    react: {
      version: "detect",
    },
    /** Allow for typescript alias resolution */
    "import/resolver": {
      typescript: {},
      // project: "tsconfig.json"
    },
  },
};
/* eslint-enable max-lines */
