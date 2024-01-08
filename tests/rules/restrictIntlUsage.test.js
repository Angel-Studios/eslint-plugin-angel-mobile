'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/restrictIntlUsage');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const validStatements = [
`
  const formatter = intlNumberFormatter(i18n.resolvedLanguage)
`,
`
  if (condition) {
    const formatter = intlNumberFormatter(i18n.resolvedLanguage)
  }
`,
`
  const formatter = dateTimeFormatter(i18n.resolvedLanguage)
`,
`
  if (condition) {
    const formatter = dateTimeFormatter(i18n.resolvedLanguage)
  }
`,
];

const invalidStatements = [
`
 const formatter = new Intl.NumberFormat(language, options)
`,
`
 const formatter = new Intl.NumberFormat(language)
`,
`
 const formatter = new Intl.DateTimeFormat(language, options)
`,
`
 const formatter = new Intl.DateTimeFormat(language)
`,
];

ruleTester.run('restrictIntlUsage', rule, {
  valid: [
    { code: validStatements[0] },
    { code: validStatements[1] },
    { code: validStatements[2] },
    { code: validStatements[3] },
  ],
  invalid: [
    { code: invalidStatements[0], errors: [{ messageId: 'numberFormat' }] },
    { code: invalidStatements[1], errors: [{ messageId: 'numberFormat' }] },
    { code: invalidStatements[2], errors: [{ messageId: 'dateTimeFormat' }] },
    { code: invalidStatements[3], errors: [{ messageId: 'dateTimeFormat' }] },
  ],
});
