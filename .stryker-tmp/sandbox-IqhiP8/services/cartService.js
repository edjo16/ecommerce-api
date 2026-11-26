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
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
class CartService {
  static async createCart(userId) {
    if (stryMutAct_9fa48("205")) {
      {}
    } else {
      stryCov_9fa48("205");
      return await Cart.create(stryMutAct_9fa48("206") ? {} : (stryCov_9fa48("206"), {
        userId
      }));
    }
  }
  static async addItemToCart(cartId, productId, quantity) {
    if (stryMutAct_9fa48("207")) {
      {}
    } else {
      stryCov_9fa48("207");
      const product = await Product.findByPk(productId);
      if (stryMutAct_9fa48("210") ? false : stryMutAct_9fa48("209") ? true : stryMutAct_9fa48("208") ? product : (stryCov_9fa48("208", "209", "210"), !product)) {
        if (stryMutAct_9fa48("211")) {
          {}
        } else {
          stryCov_9fa48("211");
          throw new Error(stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), 'Product not found'));
        }
      }
      if (stryMutAct_9fa48("216") ? product.inventory >= quantity : stryMutAct_9fa48("215") ? product.inventory <= quantity : stryMutAct_9fa48("214") ? false : stryMutAct_9fa48("213") ? true : (stryCov_9fa48("213", "214", "215", "216"), product.inventory < quantity)) {
        if (stryMutAct_9fa48("217")) {
          {}
        } else {
          stryCov_9fa48("217");
          throw new Error(stryMutAct_9fa48("218") ? "" : (stryCov_9fa48("218"), 'Not enough inventory available'));
        }
      }

      // Check if item already exists in cart
      const existingItem = await CartItem.findOne(stryMutAct_9fa48("219") ? {} : (stryCov_9fa48("219"), {
        where: stryMutAct_9fa48("220") ? {} : (stryCov_9fa48("220"), {
          cartId,
          productId
        })
      }));
      if (stryMutAct_9fa48("222") ? false : stryMutAct_9fa48("221") ? true : (stryCov_9fa48("221", "222"), existingItem)) {
        if (stryMutAct_9fa48("223")) {
          {}
        } else {
          stryCov_9fa48("223");
          const newQuantity = stryMutAct_9fa48("224") ? existingItem.quantity - quantity : (stryCov_9fa48("224"), existingItem.quantity + quantity);
          if (stryMutAct_9fa48("228") ? product.inventory >= newQuantity : stryMutAct_9fa48("227") ? product.inventory <= newQuantity : stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226", "227", "228"), product.inventory < newQuantity)) {
            if (stryMutAct_9fa48("229")) {
              {}
            } else {
              stryCov_9fa48("229");
              throw new Error(stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), 'Not enough inventory available'));
            }
          }
          existingItem.quantity = newQuantity;
          await existingItem.save();
          return existingItem;
        }
      }
      return await CartItem.create(stryMutAct_9fa48("231") ? {} : (stryCov_9fa48("231"), {
        cartId,
        productId,
        quantity
      }));
    }
  }
  static async getCartItems(cartId) {
    if (stryMutAct_9fa48("232")) {
      {}
    } else {
      stryCov_9fa48("232");
      if (stryMutAct_9fa48("234") ? false : stryMutAct_9fa48("233") ? true : (stryCov_9fa48("233", "234"), isNaN(cartId))) {
        if (stryMutAct_9fa48("235")) {
          {}
        } else {
          stryCov_9fa48("235");
          throw new Error(stryMutAct_9fa48("236") ? "" : (stryCov_9fa48("236"), 'Cart ID should be a number'));
        }
      }
      const cart = await Cart.findByPk(cartId);
      if (stryMutAct_9fa48("239") ? false : stryMutAct_9fa48("238") ? true : stryMutAct_9fa48("237") ? cart : (stryCov_9fa48("237", "238", "239"), !cart)) {
        if (stryMutAct_9fa48("240")) {
          {}
        } else {
          stryCov_9fa48("240");
          return null;
        }
      }
      const items = await CartItem.findAll(stryMutAct_9fa48("241") ? {} : (stryCov_9fa48("241"), {
        where: stryMutAct_9fa48("242") ? {} : (stryCov_9fa48("242"), {
          cartId
        }),
        include: Product
      }));
      let subtotal = 0;
      let totalTax = 0;
      const itemsWithTotals = items.map(item => {
        if (stryMutAct_9fa48("243")) {
          {}
        } else {
          stryCov_9fa48("243");
          const itemSubtotal = stryMutAct_9fa48("244") ? item.quantity / item.Product.price : (stryCov_9fa48("244"), item.quantity * item.Product.price);
          const itemTax = stryMutAct_9fa48("245") ? itemSubtotal / item.Product.taxRate : (stryCov_9fa48("245"), itemSubtotal * item.Product.taxRate);
          stryMutAct_9fa48("246") ? subtotal -= itemSubtotal : (stryCov_9fa48("246"), subtotal += itemSubtotal);
          stryMutAct_9fa48("247") ? totalTax -= itemTax : (stryCov_9fa48("247"), totalTax += itemTax);
          return stryMutAct_9fa48("248") ? {} : (stryCov_9fa48("248"), {
            ...item.toJSON(),
            itemSubtotal,
            itemTax
          });
        }
      });
      return stryMutAct_9fa48("249") ? {} : (stryCov_9fa48("249"), {
        items: itemsWithTotals,
        summary: stryMutAct_9fa48("250") ? {} : (stryCov_9fa48("250"), {
          subtotal,
          totalTax,
          total: stryMutAct_9fa48("251") ? subtotal - totalTax : (stryCov_9fa48("251"), subtotal + totalTax)
        })
      });
    }
  }
  static async updateCartItem(itemId, quantity) {
    if (stryMutAct_9fa48("252")) {
      {}
    } else {
      stryCov_9fa48("252");
      const cartItem = await CartItem.findByPk(itemId, stryMutAct_9fa48("253") ? {} : (stryCov_9fa48("253"), {
        include: Product
      }));
      if (stryMutAct_9fa48("256") ? false : stryMutAct_9fa48("255") ? true : stryMutAct_9fa48("254") ? cartItem : (stryCov_9fa48("254", "255", "256"), !cartItem)) {
        if (stryMutAct_9fa48("257")) {
          {}
        } else {
          stryCov_9fa48("257");
          throw new Error(stryMutAct_9fa48("258") ? "" : (stryCov_9fa48("258"), 'Item not found'));
        }
      }
      if (stryMutAct_9fa48("262") ? cartItem.Product.inventory >= quantity : stryMutAct_9fa48("261") ? cartItem.Product.inventory <= quantity : stryMutAct_9fa48("260") ? false : stryMutAct_9fa48("259") ? true : (stryCov_9fa48("259", "260", "261", "262"), cartItem.Product.inventory < quantity)) {
        if (stryMutAct_9fa48("263")) {
          {}
        } else {
          stryCov_9fa48("263");
          throw new Error(stryMutAct_9fa48("264") ? "" : (stryCov_9fa48("264"), 'Not enough inventory available'));
        }
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    }
  }
  static async removeCartItem(itemId) {
    if (stryMutAct_9fa48("265")) {
      {}
    } else {
      stryCov_9fa48("265");
      const cartItem = await CartItem.findByPk(itemId);
      if (stryMutAct_9fa48("268") ? false : stryMutAct_9fa48("267") ? true : stryMutAct_9fa48("266") ? cartItem : (stryCov_9fa48("266", "267", "268"), !cartItem)) {
        if (stryMutAct_9fa48("269")) {
          {}
        } else {
          stryCov_9fa48("269");
          throw new Error(stryMutAct_9fa48("270") ? "" : (stryCov_9fa48("270"), 'Item not found'));
        }
      }
      await cartItem.destroy();
    }
  }
}
module.exports = CartService;