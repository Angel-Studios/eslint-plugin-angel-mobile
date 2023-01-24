'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/apollousequerygenerics');

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
    },
});

const validStatements = [
    `const a = useQuery<GraphQuery, QueryTypeVariables>()`,
    `import { gql, useQuery, useReactiveVar } from '@apollo/client'`
];

const invalidStatements = [
    `const a = useQuery()`,
    `const a = useQuery<GraphQuery>()`,
    `const { data, refetch } = useQuery(AVATAR_HEADER_HOOK_QUERY, {skip: !isLoggedInVar})`,
    `const { data, refetch } = useQuery<GraphQuery>(AVATAR_HEADER_HOOK_QUERY, {skip: !isLoggedInVar})`

];

ruleTester.run('apollousequerygenerics', rule, {
    valid: [
        { code: validStatements[0] },
        { code: validStatements[1] },
    ],
    invalid: [
        { code: invalidStatements[0], errors: [{ messageId: 'genericsrequired' }] },
        { code: invalidStatements[1], errors: [{ messageId: 'variablestyperequired' }] },
        { code: invalidStatements[2], errors: [{ messageId: 'genericsrequired' }] },
        { code: invalidStatements[3], errors: [{ messageId: 'variablestyperequired' }] },
    ],
});
