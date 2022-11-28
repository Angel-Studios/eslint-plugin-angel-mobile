'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/optimizelyvardefault');

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
  <OptimizelyVariation default></OptimizelyVariation>
`,
`
  <OptimizelyVariation variation={'on'}></OptimizelyVariation>
`,
];

const invalidStatements = [
  `
  <OptimizelyVariation default={true}></OptimizelyVariation>
`,
`
  <OptimizelyVariation default={false}></OptimizelyVariation>
`,
];

ruleTester.run('optimizelyvardefault', rule, {
  valid: [
    { code: validStatements[0] },
    { code: validStatements[1] },
  ],
  invalid: [
    { code: invalidStatements[0], errors: [{ messageId: 'defaultreq' }] },
    { code: invalidStatements[1], errors: [{ messageId: 'defaultreq' }] }
  ],
});
