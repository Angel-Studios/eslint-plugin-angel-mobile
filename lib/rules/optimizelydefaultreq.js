'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      defaultreq:
        'OptimizelyVariation that has default prop should have no value to always evaluate to true. Passing false is useless, otherwise just do not have the prop.'
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'default') return;
        const parentName = node.parent.name;
        const componentName = parentName.name || parentName.property.name;
        if (componentName === 'OptimizelyVariation') {
          if (node.value !== null) {
            context.report({
              node,
              messageId: 'defaultreq',
            });
          }
          return;
        }
      },
    };
  },
};
