'use strict';

const console = require('console')

module.exports = {
    meta: {
        type: 'problem',
        messages: {
            genericsrequired: `when calling Apollo useQuery, specifying the generated query type and variable types are required. Ex: useQuery<useDefinedQuery, userDefinedQueryVariables> -- The name of the query suffixed with Query and QueryVariables will be in the src/services/apollo/generated.ts`,
            variablestyperequired: `specifying the second useQuery generic parameter is required. Ex: useQuery<useDefinedQuery, userDefinedQueryVariables> -- find the [queryName]QueryVariables type in /src/services/apollo/generated.ts`
        },
    },
    defaultOptions: [],
    create: (context) => {
        return {
            Program: (node) => {
                const importTokenIndex = node.tokens.findIndex(t => t.value === 'import')
                if(importTokenIndex > -1) {
                    //omit import statements from linting
                    return
                }
                const useQueryTokenIndex = node.tokens.findIndex(t => t.value === 'useQuery')
                const openingGenericPunctuatorIndex = node.tokens.findIndex(t => t.value === '<')
                const closingGenericPunctuatorIndex = node.tokens.findIndex(t => t.value === '>')
                const separatorGenericPunctuatorIndex = node.tokens.findIndex(
                    (t, i) => t.value === ',' && i > openingGenericPunctuatorIndex && i < closingGenericPunctuatorIndex
                )

                // useQuery is in the AST statement
                if(useQueryTokenIndex > -1) {
                    // If generic is not present at all, show general generics instructions
                    if(openingGenericPunctuatorIndex === -1) {
                        context.report({node, messageId: 'genericsrequired',});
                    }
                    //if there are not two variables in the generic, give the variables specific instructions
                    else if(separatorGenericPunctuatorIndex === -1){
                        context.report({node, messageId: 'variablestyperequired'});
                    }
                }
            },
        };
    },
};
