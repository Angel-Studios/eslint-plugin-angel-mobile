'use strict';

const rules = {
  optimizelyvardefault: require('./lib/rules/optimizelyvardefault'),
  optimizelyexpreq: require('./lib/rules/optimizelyexpreq'),
  actionsheetmanagerreqcontext: require('./lib/rules/actionsheetmanagerreqcontext'),
};

module.exports = { rules };
