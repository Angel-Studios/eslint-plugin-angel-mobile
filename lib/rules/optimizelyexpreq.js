'use strict';

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      notboth: 'OptimizelyVariation should not have both variation and default props.',
      atleastone: 'OptimizelyExperiment should have at least one OptimizelyVariation with default prop.',
      notmorethanone: 'OptimizelyExperiment should not have more than one OptimizelyVariation with default prop.'
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      JSXOpeningElement(node) {
        // Rule 1
        if (node.name.name === 'OptimizelyVariation') {
          const variationAttr = node.attributes.find((a) => a.name.name === 'variation');
          if (variationAttr) {
            const defaultAttr = node.attributes.find((a) => a.name.name === 'default');
            if (defaultAttr) {
              context.report({
                node,
                messageId: 'notboth',
              });
            }
          }
        }

        // Rule 2
        if (node.name.name === 'OptimizelyExperiment') {
          const children = node.parent.children;
          const jsxElements = children.filter((c) => c.type === 'JSXElement');
          const allOptVariations = jsxElements.filter((c) => c.openingElement.name.name === 'OptimizelyVariation')?.map((c) => c.openingElement);
          let foundDefault = false;
          for (const optVar of allOptVariations) {
            if (optVar) {
              const onReadyAttribute = optVar.attributes.find((a) => a.name.name === 'default');
              if (onReadyAttribute) {
                if (foundDefault === true) {
                  context.report({
                    node,
                    messageId: 'notmorethanone'
                  });
                } else {
                  foundDefault = true;
                }
              }
            }
          }
          if (!foundDefault) {
            context.report({
              node,
              messageId: 'atleastone'
            });
          }
        }
      },
    };
  },
};
