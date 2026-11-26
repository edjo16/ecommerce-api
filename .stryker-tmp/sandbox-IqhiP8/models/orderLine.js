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
const Order = require('./order');
const Product = require('./product');
const OrderLine = sequelize.define(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), 'OrderLine'), stryMutAct_9fa48("67") ? {} : (stryCov_9fa48("67"), {
  quantity: stryMutAct_9fa48("68") ? {} : (stryCov_9fa48("68"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("69") ? true : (stryCov_9fa48("69"), false)
  }),
  unitPriceCents: stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("71") ? true : (stryCov_9fa48("71"), false)
  }),
  taxRate: stryMutAct_9fa48("72") ? {} : (stryCov_9fa48("72"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73"), false)
  }),
  lineSubtotalCents: stryMutAct_9fa48("74") ? {} : (stryCov_9fa48("74"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75"), false)
  }),
  lineDiscountCents: stryMutAct_9fa48("76") ? {} : (stryCov_9fa48("76"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("77") ? true : (stryCov_9fa48("77"), false)
  }),
  lineTaxCents: stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79"), false)
  })
}));
Order.hasMany(OrderLine, stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
  foreignKey: stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), 'orderId'),
  as: stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), 'lines')
}));
OrderLine.belongsTo(Order, stryMutAct_9fa48("83") ? {} : (stryCov_9fa48("83"), {
  foreignKey: stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), 'orderId')
}));
OrderLine.belongsTo(Product, stryMutAct_9fa48("85") ? {} : (stryCov_9fa48("85"), {
  foreignKey: stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), 'productId')
}));
module.exports = OrderLine;