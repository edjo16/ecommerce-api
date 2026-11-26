// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const {
  DataTypes
} = require('sequelize');
const {
  sequelize
} = require('./index');
const Category = require('./category');
const Product = sequelize.define(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), 'Product'), stryMutAct_9fa48("88") ? {} : (stryCov_9fa48("88"), {
  name: stryMutAct_9fa48("89") ? {} : (stryCov_9fa48("89"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90"), false)
  }),
  price: stryMutAct_9fa48("91") ? {} : (stryCov_9fa48("91"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("92") ? true : (stryCov_9fa48("92"), false)
  }),
  description: stryMutAct_9fa48("93") ? {} : (stryCov_9fa48("93"), {
    type: DataTypes.TEXT
  }),
  inventory: stryMutAct_9fa48("94") ? {} : (stryCov_9fa48("94"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("95") ? true : (stryCov_9fa48("95"), false),
    defaultValue: 0,
    validate: stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
      min: 0
    })
  }),
  taxRate: stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("98") ? true : (stryCov_9fa48("98"), false),
    defaultValue: 0,
    validate: stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
      min: 0,
      max: 1 // Represents tax rate as decimal (e.g., 0.1 for 10%)
    })
  })
}));
Product.belongsTo(Category, stryMutAct_9fa48("100") ? {} : (stryCov_9fa48("100"), {
  foreignKey: stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), 'categoryId')
}));
module.exports = Product;