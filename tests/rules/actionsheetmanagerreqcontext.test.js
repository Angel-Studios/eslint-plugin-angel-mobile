'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/actionsheetmanagerreqcontext');

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
  SheetManager.show('blah', { context: 'blah' })
`,
`
  SheetManager.show('blah', { otherparam: 'blah', context: 'blah' })
`,
`
  if (condition) {
    SheetManager.show('blah', { context: 'blah', otherparam: 'blah' })
  }
`,
`
  if (condition) {
    SheetManager.show('blah', { otherparam: 'blah', context: 'blah' })
  }
`,
`
  Sheetmanager.show('blah')
`,
];

const invalidStatements = [
  `
  SheetManager.show('blah')
`,
`
  SheetManager.show('blah', { otherparam: 'blah' })
`,
`
  if (condition) {
    SheetManager.show('blah')
  }
`,
`
  if (condition) {
    SheetManager.show('blah', { otherparam: 'blah' })
  }
`,
];

ruleTester.run('actionsheetmanagerreqcontext', rule, {
  valid: [
    { code: validStatements[0] },
    { code: validStatements[1] },
    { code: validStatements[2] },
    { code: validStatements[3] },
    { code: validStatements[4] },
  ],
  invalid: [
    { code: invalidStatements[0], errors: [{ messageId: 'defaultreq' }] },
    { code: invalidStatements[1], errors: [{ messageId: 'defaultreq' }] },
    { code: invalidStatements[2], errors: [{ messageId: 'defaultreq' }] },
    { code: invalidStatements[3], errors: [{ messageId: 'defaultreq' }] },
  ],
});
