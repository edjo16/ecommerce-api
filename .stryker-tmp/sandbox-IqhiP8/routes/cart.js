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
const express = require('express');
const CartService = require('../services/cartService');
const CheckoutService = require('../services/checkoutService');
const router = express.Router();

// Create a new cart for a user
router.post(stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), '/:userId'), async (req, res) => {
  if (stryMutAct_9fa48("103")) {
    {}
  } else {
    stryCov_9fa48("103");
    try {
      if (stryMutAct_9fa48("104")) {
        {}
      } else {
        stryCov_9fa48("104");
        const cart = await CartService.createCart(req.params.userId);
        res.status(201).json(cart);
      }
    } catch (error) {
      if (stryMutAct_9fa48("105")) {
        {}
      } else {
        stryCov_9fa48("105");
        res.status(400).json(stryMutAct_9fa48("106") ? {} : (stryCov_9fa48("106"), {
          error: error.message
        }));
      }
    }
  }
});

// Add an item to the cart
router.post(stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), '/:cartId/items'), async (req, res) => {
  if (stryMutAct_9fa48("108")) {
    {}
  } else {
    stryCov_9fa48("108");
    try {
      if (stryMutAct_9fa48("109")) {
        {}
      } else {
        stryCov_9fa48("109");
        const {
          productId,
          quantity
        } = req.body;
        const cartItem = await CartService.addItemToCart(req.params.cartId, productId, quantity);
        res.status(201).json(cartItem);
      }
    } catch (error) {
      if (stryMutAct_9fa48("110")) {
        {}
      } else {
        stryCov_9fa48("110");
        res.status(400).json(stryMutAct_9fa48("111") ? {} : (stryCov_9fa48("111"), {
          error: error.message
        }));
      }
    }
  }
});

// Get all items in a cart
router.get(stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), '/:cartId/items'), async (req, res) => {
  if (stryMutAct_9fa48("113")) {
    {}
  } else {
    stryCov_9fa48("113");
    try {
      if (stryMutAct_9fa48("114")) {
        {}
      } else {
        stryCov_9fa48("114");
        const items = await CartService.getCartItems(req.params.cartId);
        if (stryMutAct_9fa48("116") ? false : stryMutAct_9fa48("115") ? true : (stryCov_9fa48("115", "116"), items)) {
          if (stryMutAct_9fa48("117")) {
            {}
          } else {
            stryCov_9fa48("117");
            res.json(items);
          }
        } else {
          if (stryMutAct_9fa48("118")) {
            {}
          } else {
            stryCov_9fa48("118");
            res.status(404).json(stryMutAct_9fa48("119") ? {} : (stryCov_9fa48("119"), {
              error: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "Cart doesn't exist")
            }));
          }
        }
      }
    } catch (error) {
      if (stryMutAct_9fa48("121")) {
        {}
      } else {
        stryCov_9fa48("121");
        res.status(400).json(stryMutAct_9fa48("122") ? {} : (stryCov_9fa48("122"), {
          error: error.message
        }));
      }
    }
  }
});

// Update quantity of a cart item
router.put(stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), '/:cartId/items/:itemId'), async (req, res) => {
  if (stryMutAct_9fa48("124")) {
    {}
  } else {
    stryCov_9fa48("124");
    try {
      if (stryMutAct_9fa48("125")) {
        {}
      } else {
        stryCov_9fa48("125");
        const {
          quantity
        } = req.body;
        const cartItem = await CartService.updateCartItem(req.params.itemId, quantity);
        res.json(cartItem);
      }
    } catch (error) {
      if (stryMutAct_9fa48("126")) {
        {}
      } else {
        stryCov_9fa48("126");
        res.status(400).json(stryMutAct_9fa48("127") ? {} : (stryCov_9fa48("127"), {
          error: error.message
        }));
      }
    }
  }
});

// Remove an item from the cart
router.delete(stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), '/:cartId/items/:itemId'), async (req, res) => {
  if (stryMutAct_9fa48("129")) {
    {}
  } else {
    stryCov_9fa48("129");
    try {
      if (stryMutAct_9fa48("130")) {
        {}
      } else {
        stryCov_9fa48("130");
        await CartService.removeCartItem(req.params.itemId);
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("131")) {
        {}
      } else {
        stryCov_9fa48("131");
        res.status(400).json(stryMutAct_9fa48("132") ? {} : (stryCov_9fa48("132"), {
          error: error.message
        }));
      }
    }
  }
});

// Charge the cart once and freeze the total
router.post(stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), '/:cartId/checkout'), async (req, res) => {
  if (stryMutAct_9fa48("134")) {
    {}
  } else {
    stryCov_9fa48("134");
    try {
      if (stryMutAct_9fa48("135")) {
        {}
      } else {
        stryCov_9fa48("135");
        const coupon = req.body ? req.body.coupon : undefined;
        const order = await CheckoutService.checkout(req.params.cartId, coupon);
        res.status(201).json(order);
      }
    } catch (error) {
      if (stryMutAct_9fa48("136")) {
        {}
      } else {
        stryCov_9fa48("136");
        res.status(stryMutAct_9fa48("139") ? error.statusCode && 400 : stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : (stryCov_9fa48("137", "138", "139"), error.statusCode || 400)).json(stryMutAct_9fa48("140") ? {} : (stryCov_9fa48("140"), {
          error: error.message
        }));
      }
    }
  }
});

// Read the frozen order
router.get(stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), '/:cartId/order'), async (req, res) => {
  if (stryMutAct_9fa48("142")) {
    {}
  } else {
    stryCov_9fa48("142");
    try {
      if (stryMutAct_9fa48("143")) {
        {}
      } else {
        stryCov_9fa48("143");
        const order = await CheckoutService.getOrder(req.params.cartId);
        res.json(order);
      }
    } catch (error) {
      if (stryMutAct_9fa48("144")) {
        {}
      } else {
        stryCov_9fa48("144");
        res.status(stryMutAct_9fa48("147") ? error.statusCode && 400 : stryMutAct_9fa48("146") ? false : stryMutAct_9fa48("145") ? true : (stryCov_9fa48("145", "146", "147"), error.statusCode || 400)).json(stryMutAct_9fa48("148") ? {} : (stryCov_9fa48("148"), {
          error: error.message
        }));
      }
    }
  }
});
module.exports = router;