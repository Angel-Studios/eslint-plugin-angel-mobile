'use strict';

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      numberFormat:
        `Please use 'intlNumberFormatter' instead (uses Intl, but in a trycatch). new Intl.NumberFormat usage is restricted because of snagged errors.`,
      dateTimeFormat:
        `Please use 'dateTimeFormatter' instead (uses Intl, but in a trycatch). new Intl.DateTimeFormat usage is restricted because of snagged errors.`
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      NewExpression(node) {
        if (node?.callee?.object?.name !== 'Intl') {
          return
        }
        if (node?.callee?.property?.name === 'NumberFormat') {
          context.report({
            node,
            messageId: 'numberFormat',
          })
          return
        }
        if (node?.callee?.property?.name === 'DateTimeFormat') {
          context.report({
            node,
            messageId: 'dateTimeFormat',
          })
          return
        }
      }
    }
  },
};
