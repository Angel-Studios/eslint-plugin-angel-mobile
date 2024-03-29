'use strict';

const rules = {
  optimizelyvardefault: require('./lib/rules/optimizelyvardefault'),
  optimizelyexpreq: require('./lib/rules/optimizelyexpreq'),
  actionsheetmanagerreqcontext: require('./lib/rules/actionsheetmanagerreqcontext'),
  restrictIntlUsage: require('./lib/rules/restrictIntlUsage')
};

module.exports = { rules };
