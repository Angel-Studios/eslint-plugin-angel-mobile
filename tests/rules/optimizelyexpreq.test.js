'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/optimizelyexpreq');

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
<OptimizelyExperiment>
  <OptimizelyVariation variation={'on'}></OptimizelyVariation>
  <OptimizelyVariation default></OptimizelyVariation>
</OptimizelyExperiment>
`,
];

const invalidStatements = [
  `
  <OptimizelyVariation variation={'on'} default></OptimizelyVariation>
`,
`
<OptimizelyExperiment>
  <OptimizelyVariation variation={'on'}></OptimizelyVariation>
  <OptimizelyVariation variation={'off'}></OptimizelyVariation>
</OptimizelyExperiment>
`,
`
<OptimizelyExperiment>
  <OptimizelyVariation variation={'on'}></OptimizelyVariation>
  <OptimizelyVariation variation={'off'}></OptimizelyVariation>
  <OptimizelyVariation default></OptimizelyVariation>
  <OptimizelyVariation default></OptimizelyVariation>
</OptimizelyExperiment>
`,
];

ruleTester.run('optimizelyexpreq', rule, {
  valid: [
    { code: validStatements[0] },
    { code: validStatements[1] }
  ],
  invalid: [
    { code: invalidStatements[0], errors: [{ messageId: 'notboth' }] },
    { code: invalidStatements[1], errors: [{ messageId: 'atleastone' }] },
    { code: invalidStatements[2], errors: [{ messageId: 'notmorethanone' }] }
  ],
});
