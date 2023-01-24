'use strict';

const rules = {
  optimizelyvardefault: require('./lib/rules/optimizelyvardefault'),
  optimizelyexpreq: require('./lib/rules/optimizelyexpreq'),
  apollousequerygenerics: require('./lib/rules/apollousequerygenerics'),
};

module.exports = { rules };
