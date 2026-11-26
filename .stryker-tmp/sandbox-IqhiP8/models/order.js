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
const Cart = require('./cart');
const Order = sequelize.define(stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), 'Order'), stryMutAct_9fa48("40") ? {} : (stryCov_9fa48("40"), {
  cartId: stryMutAct_9fa48("41") ? {} : (stryCov_9fa48("41"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("42") ? true : (stryCov_9fa48("42"), false),
    unique: stryMutAct_9fa48("43") ? false : (stryCov_9fa48("43"), true)
  }),
  subtotalCents: stryMutAct_9fa48("44") ? {} : (stryCov_9fa48("44"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("45") ? true : (stryCov_9fa48("45"), false)
  }),
  discountCents: stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("47") ? true : (stryCov_9fa48("47"), false)
  }),
  taxableCents: stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("49") ? true : (stryCov_9fa48("49"), false)
  }),
  taxCents: stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51"), false)
  }),
  shippingCents: stryMutAct_9fa48("52") ? {} : (stryCov_9fa48("52"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("53") ? true : (stryCov_9fa48("53"), false)
  }),
  totalCents: stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55"), false)
  }),
  couponType: stryMutAct_9fa48("56") ? {} : (stryCov_9fa48("56"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("57") ? false : (stryCov_9fa48("57"), true)
  }),
  couponValue: stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
    type: DataTypes.FLOAT,
    allowNull: stryMutAct_9fa48("59") ? false : (stryCov_9fa48("59"), true)
  }),
  couponMinSubtotalCents: stryMutAct_9fa48("60") ? {} : (stryCov_9fa48("60"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("61") ? false : (stryCov_9fa48("61"), true)
  })
}));
Order.belongsTo(Cart, stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
  foreignKey: stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), 'cartId')
}));
Cart.hasOne(Order, stryMutAct_9fa48("64") ? {} : (stryCov_9fa48("64"), {
  foreignKey: stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), 'cartId')
}));
module.exports = Order;