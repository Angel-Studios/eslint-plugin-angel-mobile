'use strict';

const rules = {
  optimizelyvardefault: require('./lib/rules/optimizelyvardefault'),
  optimizelyexpreq: require('./lib/rules/optimizelyexpreq'),
};

module.exports = { rules };
