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
  sequelize
} = require('../models');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderLine = require('../models/orderLine');
const {
  priceCheckout
} = require('./pricing');
function fail(message, statusCode) {
  if (stryMutAct_9fa48("271")) {
    {}
  } else {
    stryCov_9fa48("271");
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}
function fromCents(cents) {
  if (stryMutAct_9fa48("272")) {
    {}
  } else {
    stryCov_9fa48("272");
    return Number((stryMutAct_9fa48("273") ? cents * 100 : (stryCov_9fa48("273"), cents / 100)).toFixed(2));
  }
}
function serializeLine(line) {
  if (stryMutAct_9fa48("274")) {
    {}
  } else {
    stryCov_9fa48("274");
    return stryMutAct_9fa48("275") ? {} : (stryCov_9fa48("275"), {
      productId: line.productId,
      quantity: line.quantity,
      unitPrice: fromCents(line.unitPriceCents),
      taxRate: line.taxRate,
      lineSubtotal: fromCents(line.lineSubtotalCents),
      lineDiscount: fromCents(line.lineDiscountCents),
      lineTax: fromCents(line.lineTaxCents)
    });
  }
}
function serializeOrder(order) {
  if (stryMutAct_9fa48("276")) {
    {}
  } else {
    stryCov_9fa48("276");
    const coupon = order.couponType ? stryMutAct_9fa48("277") ? {} : (stryCov_9fa48("277"), {
      type: order.couponType,
      value: order.couponValue,
      ...((stryMutAct_9fa48("280") ? order.couponMinSubtotalCents != null : stryMutAct_9fa48("279") ? false : stryMutAct_9fa48("278") ? true : (stryCov_9fa48("278", "279", "280"), order.couponMinSubtotalCents == null)) ? {} : stryMutAct_9fa48("281") ? {} : (stryCov_9fa48("281"), {
        minSubtotal: fromCents(order.couponMinSubtotalCents)
      }))
    }) : null;
    return stryMutAct_9fa48("282") ? {} : (stryCov_9fa48("282"), {
      id: order.id,
      cartId: order.cartId,
      subtotal: fromCents(order.subtotalCents),
      discount: fromCents(order.discountCents),
      taxable: fromCents(order.taxableCents),
      tax: fromCents(order.taxCents),
      shipping: fromCents(order.shippingCents),
      total: fromCents(order.totalCents),
      coupon,
      lines: (stryMutAct_9fa48("285") ? order.lines && [] : stryMutAct_9fa48("284") ? false : stryMutAct_9fa48("283") ? true : (stryCov_9fa48("283", "284", "285"), order.lines || (stryMutAct_9fa48("286") ? ["Stryker was here"] : (stryCov_9fa48("286"), [])))).map(serializeLine)
    });
  }
}
function assertCartId(cartId) {
  if (stryMutAct_9fa48("287")) {
    {}
  } else {
    stryCov_9fa48("287");
    if (stryMutAct_9fa48("289") ? false : stryMutAct_9fa48("288") ? true : (stryCov_9fa48("288", "289"), isNaN(cartId))) {
      if (stryMutAct_9fa48("290")) {
        {}
      } else {
        stryCov_9fa48("290");
        throw fail(stryMutAct_9fa48("291") ? "" : (stryCov_9fa48("291"), 'Cart ID should be a number'), 400);
      }
    }
  }
}
class CheckoutService {
  static async checkout(cartId, coupon) {
    if (stryMutAct_9fa48("292")) {
      {}
    } else {
      stryCov_9fa48("292");
      assertCartId(cartId);
      const order = await sequelize.transaction(async transaction => {
        if (stryMutAct_9fa48("293")) {
          {}
        } else {
          stryCov_9fa48("293");
          const cart = await Cart.findByPk(cartId, stryMutAct_9fa48("294") ? {} : (stryCov_9fa48("294"), {
            transaction
          }));
          if (stryMutAct_9fa48("297") ? false : stryMutAct_9fa48("296") ? true : stryMutAct_9fa48("295") ? cart : (stryCov_9fa48("295", "296", "297"), !cart)) {
            if (stryMutAct_9fa48("298")) {
              {}
            } else {
              stryCov_9fa48("298");
              throw fail(stryMutAct_9fa48("299") ? "" : (stryCov_9fa48("299"), "Cart doesn't exist"), 404);
            }
          }
          if (stryMutAct_9fa48("302") ? cart.status !== 'checked_out' : stryMutAct_9fa48("301") ? false : stryMutAct_9fa48("300") ? true : (stryCov_9fa48("300", "301", "302"), cart.status === (stryMutAct_9fa48("303") ? "" : (stryCov_9fa48("303"), 'checked_out')))) {
            if (stryMutAct_9fa48("304")) {
              {}
            } else {
              stryCov_9fa48("304");
              throw fail(stryMutAct_9fa48("305") ? "" : (stryCov_9fa48("305"), 'Cart already checked out'), 400);
            }
          }
          const items = await CartItem.findAll(stryMutAct_9fa48("306") ? {} : (stryCov_9fa48("306"), {
            where: stryMutAct_9fa48("307") ? {} : (stryCov_9fa48("307"), {
              cartId: cart.id
            }),
            include: Product,
            transaction
          }));
          if (stryMutAct_9fa48("310") ? items.length !== 0 : stryMutAct_9fa48("309") ? false : stryMutAct_9fa48("308") ? true : (stryCov_9fa48("308", "309", "310"), items.length === 0)) {
            if (stryMutAct_9fa48("311")) {
              {}
            } else {
              stryCov_9fa48("311");
              throw fail(stryMutAct_9fa48("312") ? "" : (stryCov_9fa48("312"), 'Cart is empty'), 400);
            }
          }
          const priced = priceCheckout(items.map(item => {
            if (stryMutAct_9fa48("313")) {
              {}
            } else {
              stryCov_9fa48("313");
              if (stryMutAct_9fa48("316") ? false : stryMutAct_9fa48("315") ? true : stryMutAct_9fa48("314") ? item.Product : (stryCov_9fa48("314", "315", "316"), !item.Product)) {
                if (stryMutAct_9fa48("317")) {
                  {}
                } else {
                  stryCov_9fa48("317");
                  throw fail(stryMutAct_9fa48("318") ? "" : (stryCov_9fa48("318"), 'Product not found'), 400);
                }
              }
              return stryMutAct_9fa48("319") ? {} : (stryCov_9fa48("319"), {
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.Product.price,
                taxRate: item.Product.taxRate
              });
            }
          }), coupon);
          for (const item of items) {
            if (stryMutAct_9fa48("320")) {
              {}
            } else {
              stryCov_9fa48("320");
              const product = await Product.findByPk(item.productId, stryMutAct_9fa48("321") ? {} : (stryCov_9fa48("321"), {
                transaction
              }));
              if (stryMutAct_9fa48("324") ? !product && product.inventory < item.quantity : stryMutAct_9fa48("323") ? false : stryMutAct_9fa48("322") ? true : (stryCov_9fa48("322", "323", "324"), (stryMutAct_9fa48("325") ? product : (stryCov_9fa48("325"), !product)) || (stryMutAct_9fa48("328") ? product.inventory >= item.quantity : stryMutAct_9fa48("327") ? product.inventory <= item.quantity : stryMutAct_9fa48("326") ? false : (stryCov_9fa48("326", "327", "328"), product.inventory < item.quantity)))) {
                if (stryMutAct_9fa48("329")) {
                  {}
                } else {
                  stryCov_9fa48("329");
                  throw fail(stryMutAct_9fa48("330") ? "" : (stryCov_9fa48("330"), 'Not enough inventory available'), 400);
                }
              }
              stryMutAct_9fa48("331") ? product.inventory += item.quantity : (stryCov_9fa48("331"), product.inventory -= item.quantity);
              await product.save(stryMutAct_9fa48("332") ? {} : (stryCov_9fa48("332"), {
                transaction
              }));
            }
          }
          const created = await Order.create(stryMutAct_9fa48("333") ? {} : (stryCov_9fa48("333"), {
            cartId: cart.id,
            subtotalCents: priced.subtotalCents,
            discountCents: priced.discountCents,
            taxableCents: priced.taxableCents,
            taxCents: priced.taxCents,
            shippingCents: priced.shippingCents,
            totalCents: priced.totalCents,
            couponType: priced.coupon ? priced.coupon.type : null,
            couponValue: priced.coupon ? priced.coupon.value : null,
            couponMinSubtotalCents: (stryMutAct_9fa48("336") ? priced.coupon || priced.coupon.minSubtotal != null : stryMutAct_9fa48("335") ? false : stryMutAct_9fa48("334") ? true : (stryCov_9fa48("334", "335", "336"), priced.coupon && (stryMutAct_9fa48("338") ? priced.coupon.minSubtotal == null : stryMutAct_9fa48("337") ? true : (stryCov_9fa48("337", "338"), priced.coupon.minSubtotal != null)))) ? Math.round(stryMutAct_9fa48("339") ? priced.coupon.minSubtotal / 100 : (stryCov_9fa48("339"), priced.coupon.minSubtotal * 100)) : null
          }), stryMutAct_9fa48("340") ? {} : (stryCov_9fa48("340"), {
            transaction
          }));
          for (const line of priced.lines) {
            if (stryMutAct_9fa48("341")) {
              {}
            } else {
              stryCov_9fa48("341");
              await OrderLine.create(stryMutAct_9fa48("342") ? {} : (stryCov_9fa48("342"), {
                orderId: created.id,
                productId: line.productId,
                quantity: line.quantity,
                unitPriceCents: Math.round(stryMutAct_9fa48("343") ? line.unitPrice / 100 : (stryCov_9fa48("343"), line.unitPrice * 100)),
                taxRate: line.taxRate,
                lineSubtotalCents: line.lineSubtotalCents,
                lineDiscountCents: line.lineDiscountCents,
                lineTaxCents: line.lineTaxCents
              }), stryMutAct_9fa48("344") ? {} : (stryCov_9fa48("344"), {
                transaction
              }));
            }
          }
          cart.status = stryMutAct_9fa48("345") ? "" : (stryCov_9fa48("345"), 'checked_out');
          await cart.save(stryMutAct_9fa48("346") ? {} : (stryCov_9fa48("346"), {
            transaction
          }));
          return Order.findByPk(created.id, stryMutAct_9fa48("347") ? {} : (stryCov_9fa48("347"), {
            include: stryMutAct_9fa48("348") ? [] : (stryCov_9fa48("348"), [stryMutAct_9fa48("349") ? {} : (stryCov_9fa48("349"), {
              model: OrderLine,
              as: stryMutAct_9fa48("350") ? "" : (stryCov_9fa48("350"), 'lines')
            })]),
            order: stryMutAct_9fa48("351") ? [] : (stryCov_9fa48("351"), [stryMutAct_9fa48("352") ? [] : (stryCov_9fa48("352"), [stryMutAct_9fa48("353") ? {} : (stryCov_9fa48("353"), {
              model: OrderLine,
              as: stryMutAct_9fa48("354") ? "" : (stryCov_9fa48("354"), 'lines')
            }), stryMutAct_9fa48("355") ? "" : (stryCov_9fa48("355"), 'id'), stryMutAct_9fa48("356") ? "" : (stryCov_9fa48("356"), 'ASC')])]),
            transaction
          }));
        }
      });
      return serializeOrder(order);
    }
  }
  static async getOrder(cartId) {
    if (stryMutAct_9fa48("357")) {
      {}
    } else {
      stryCov_9fa48("357");
      assertCartId(cartId);
      const cart = await Cart.findByPk(cartId);
      if (stryMutAct_9fa48("360") ? false : stryMutAct_9fa48("359") ? true : stryMutAct_9fa48("358") ? cart : (stryCov_9fa48("358", "359", "360"), !cart)) {
        if (stryMutAct_9fa48("361")) {
          {}
        } else {
          stryCov_9fa48("361");
          throw fail(stryMutAct_9fa48("362") ? "" : (stryCov_9fa48("362"), "Cart doesn't exist"), 404);
        }
      }
      const order = await Order.findOne(stryMutAct_9fa48("363") ? {} : (stryCov_9fa48("363"), {
        where: stryMutAct_9fa48("364") ? {} : (stryCov_9fa48("364"), {
          cartId: cart.id
        }),
        include: stryMutAct_9fa48("365") ? [] : (stryCov_9fa48("365"), [stryMutAct_9fa48("366") ? {} : (stryCov_9fa48("366"), {
          model: OrderLine,
          as: stryMutAct_9fa48("367") ? "" : (stryCov_9fa48("367"), 'lines')
        })]),
        order: stryMutAct_9fa48("368") ? [] : (stryCov_9fa48("368"), [stryMutAct_9fa48("369") ? [] : (stryCov_9fa48("369"), [stryMutAct_9fa48("370") ? {} : (stryCov_9fa48("370"), {
          model: OrderLine,
          as: stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), 'lines')
        }), stryMutAct_9fa48("372") ? "" : (stryCov_9fa48("372"), 'id'), stryMutAct_9fa48("373") ? "" : (stryCov_9fa48("373"), 'ASC')])])
      }));
      if (stryMutAct_9fa48("376") ? false : stryMutAct_9fa48("375") ? true : stryMutAct_9fa48("374") ? order : (stryCov_9fa48("374", "375", "376"), !order)) {
        if (stryMutAct_9fa48("377")) {
          {}
        } else {
          stryCov_9fa48("377");
          throw fail(stryMutAct_9fa48("378") ? "" : (stryCov_9fa48("378"), 'Order not found'), 404);
        }
      }
      return serializeOrder(order);
    }
  }
}
module.exports = CheckoutService;