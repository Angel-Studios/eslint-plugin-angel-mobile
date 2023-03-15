'use strict';

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      defaultreq:
        'SheetManager.show requires that you define context.'
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      CallExpression(node) {
        if (node?.callee?.object?.name !== 'SheetManager') {
          return
        }
        if (node?.callee?.property?.name !== 'show') {
          return
        }
        const contextArg = node?.arguments[1]
        if (!contextArg) {
          context.report({
            node,
            messageId: 'defaultreq',
          })
          return
        }
      const contextProp = contextArg.properties.find(prop => prop.key.name === 'context')
        if (!contextProp) {
          context.report({
            node,
            messageId: 'defaultreq',
          })
        }
      }
    }
  },
};
