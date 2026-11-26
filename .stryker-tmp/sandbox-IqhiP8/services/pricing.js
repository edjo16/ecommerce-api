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
const SHIPPING_THRESHOLD_CENTS = 5000;
const SHIPPING_FEE_CENTS = 500;
const SHIPPING_THRESHOLD = stryMutAct_9fa48("379") ? SHIPPING_THRESHOLD_CENTS * 100 : (stryCov_9fa48("379"), SHIPPING_THRESHOLD_CENTS / 100);
const SHIPPING_FEE = stryMutAct_9fa48("380") ? SHIPPING_FEE_CENTS * 100 : (stryCov_9fa48("380"), SHIPPING_FEE_CENTS / 100);
function fromCents(cents) {
  if (stryMutAct_9fa48("381")) {
    {}
  } else {
    stryCov_9fa48("381");
    return Number((stryMutAct_9fa48("382") ? cents * 100 : (stryCov_9fa48("382"), cents / 100)).toFixed(2));
  }
}
function roundToInteger(value) {
  if (stryMutAct_9fa48("383")) {
    {}
  } else {
    stryCov_9fa48("383");
    return Math.round(Number(value.toFixed(8)));
  }
}
function toCents(amount) {
  if (stryMutAct_9fa48("384")) {
    {}
  } else {
    stryCov_9fa48("384");
    return roundToInteger(stryMutAct_9fa48("385") ? amount / 100 : (stryCov_9fa48("385"), amount * 100));
  }
}
function assertCoupon(coupon) {
  if (stryMutAct_9fa48("386")) {
    {}
  } else {
    stryCov_9fa48("386");
    if (stryMutAct_9fa48("389") ? coupon != null : stryMutAct_9fa48("388") ? false : stryMutAct_9fa48("387") ? true : (stryCov_9fa48("387", "388", "389"), coupon == null)) {
      if (stryMutAct_9fa48("390")) {
        {}
      } else {
        stryCov_9fa48("390");
        return;
      }
    }
    if (stryMutAct_9fa48("393") ? typeof coupon !== 'object' && Array.isArray(coupon) : stryMutAct_9fa48("392") ? false : stryMutAct_9fa48("391") ? true : (stryCov_9fa48("391", "392", "393"), (stryMutAct_9fa48("395") ? typeof coupon === 'object' : stryMutAct_9fa48("394") ? false : (stryCov_9fa48("394", "395"), typeof coupon !== (stryMutAct_9fa48("396") ? "" : (stryCov_9fa48("396"), 'object')))) || Array.isArray(coupon))) {
      if (stryMutAct_9fa48("397")) {
        {}
      } else {
        stryCov_9fa48("397");
        throw new Error(stryMutAct_9fa48("398") ? "" : (stryCov_9fa48("398"), 'Only one coupon is allowed'));
      }
    }
    if (stryMutAct_9fa48("401") ? coupon.type !== 'percent' || coupon.type !== 'fixed' : stryMutAct_9fa48("400") ? false : stryMutAct_9fa48("399") ? true : (stryCov_9fa48("399", "400", "401"), (stryMutAct_9fa48("403") ? coupon.type === 'percent' : stryMutAct_9fa48("402") ? true : (stryCov_9fa48("402", "403"), coupon.type !== (stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), 'percent')))) && (stryMutAct_9fa48("406") ? coupon.type === 'fixed' : stryMutAct_9fa48("405") ? true : (stryCov_9fa48("405", "406"), coupon.type !== (stryMutAct_9fa48("407") ? "" : (stryCov_9fa48("407"), 'fixed')))))) {
      if (stryMutAct_9fa48("408")) {
        {}
      } else {
        stryCov_9fa48("408");
        throw new Error(stryMutAct_9fa48("409") ? "" : (stryCov_9fa48("409"), 'Coupon type must be percent or fixed'));
      }
    }
    if (stryMutAct_9fa48("412") ? (typeof coupon.value !== 'number' || !Number.isFinite(coupon.value)) && coupon.value <= 0 : stryMutAct_9fa48("411") ? false : stryMutAct_9fa48("410") ? true : (stryCov_9fa48("410", "411", "412"), (stryMutAct_9fa48("414") ? typeof coupon.value !== 'number' && !Number.isFinite(coupon.value) : stryMutAct_9fa48("413") ? false : (stryCov_9fa48("413", "414"), (stryMutAct_9fa48("416") ? typeof coupon.value === 'number' : stryMutAct_9fa48("415") ? false : (stryCov_9fa48("415", "416"), typeof coupon.value !== (stryMutAct_9fa48("417") ? "" : (stryCov_9fa48("417"), 'number')))) || (stryMutAct_9fa48("418") ? Number.isFinite(coupon.value) : (stryCov_9fa48("418"), !Number.isFinite(coupon.value))))) || (stryMutAct_9fa48("421") ? coupon.value > 0 : stryMutAct_9fa48("420") ? coupon.value < 0 : stryMutAct_9fa48("419") ? false : (stryCov_9fa48("419", "420", "421"), coupon.value <= 0)))) {
      if (stryMutAct_9fa48("422")) {
        {}
      } else {
        stryCov_9fa48("422");
        throw new Error(stryMutAct_9fa48("423") ? "" : (stryCov_9fa48("423"), 'Coupon value must be greater than zero'));
      }
    }
    if (stryMutAct_9fa48("426") ? coupon.type !== 'percent' : stryMutAct_9fa48("425") ? false : stryMutAct_9fa48("424") ? true : (stryCov_9fa48("424", "425", "426"), coupon.type === (stryMutAct_9fa48("427") ? "" : (stryCov_9fa48("427"), 'percent')))) {
      if (stryMutAct_9fa48("428")) {
        {}
      } else {
        stryCov_9fa48("428");
        if (stryMutAct_9fa48("432") ? coupon.value <= 1 : stryMutAct_9fa48("431") ? coupon.value >= 1 : stryMutAct_9fa48("430") ? false : stryMutAct_9fa48("429") ? true : (stryCov_9fa48("429", "430", "431", "432"), coupon.value > 1)) {
          if (stryMutAct_9fa48("433")) {
            {}
          } else {
            stryCov_9fa48("433");
            throw new Error(stryMutAct_9fa48("434") ? "" : (stryCov_9fa48("434"), 'Percent coupon cannot exceed 1'));
          }
        }
        if (stryMutAct_9fa48("437") ? (typeof coupon.minSubtotal !== 'number' || !Number.isFinite(coupon.minSubtotal)) && coupon.minSubtotal < 0 : stryMutAct_9fa48("436") ? false : stryMutAct_9fa48("435") ? true : (stryCov_9fa48("435", "436", "437"), (stryMutAct_9fa48("439") ? typeof coupon.minSubtotal !== 'number' && !Number.isFinite(coupon.minSubtotal) : stryMutAct_9fa48("438") ? false : (stryCov_9fa48("438", "439"), (stryMutAct_9fa48("441") ? typeof coupon.minSubtotal === 'number' : stryMutAct_9fa48("440") ? false : (stryCov_9fa48("440", "441"), typeof coupon.minSubtotal !== (stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), 'number')))) || (stryMutAct_9fa48("443") ? Number.isFinite(coupon.minSubtotal) : (stryCov_9fa48("443"), !Number.isFinite(coupon.minSubtotal))))) || (stryMutAct_9fa48("446") ? coupon.minSubtotal >= 0 : stryMutAct_9fa48("445") ? coupon.minSubtotal <= 0 : stryMutAct_9fa48("444") ? false : (stryCov_9fa48("444", "445", "446"), coupon.minSubtotal < 0)))) {
          if (stryMutAct_9fa48("447")) {
            {}
          } else {
            stryCov_9fa48("447");
            throw new Error(stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), 'Percent coupon requires a minimum subtotal'));
          }
        }
      }
    }
  }
}
function discountCentsFor(subtotalCents, coupon) {
  if (stryMutAct_9fa48("449")) {
    {}
  } else {
    stryCov_9fa48("449");
    assertCoupon(coupon);
    if (stryMutAct_9fa48("452") ? coupon != null : stryMutAct_9fa48("451") ? false : stryMutAct_9fa48("450") ? true : (stryCov_9fa48("450", "451", "452"), coupon == null)) {
      if (stryMutAct_9fa48("453")) {
        {}
      } else {
        stryCov_9fa48("453");
        return 0;
      }
    }
    if (stryMutAct_9fa48("456") ? coupon.type !== 'percent' : stryMutAct_9fa48("455") ? false : stryMutAct_9fa48("454") ? true : (stryCov_9fa48("454", "455", "456"), coupon.type === (stryMutAct_9fa48("457") ? "" : (stryCov_9fa48("457"), 'percent')))) {
      if (stryMutAct_9fa48("458")) {
        {}
      } else {
        stryCov_9fa48("458");
        const minCents = toCents(coupon.minSubtotal);
        if (stryMutAct_9fa48("462") ? subtotalCents >= minCents : stryMutAct_9fa48("461") ? subtotalCents <= minCents : stryMutAct_9fa48("460") ? false : stryMutAct_9fa48("459") ? true : (stryCov_9fa48("459", "460", "461", "462"), subtotalCents < minCents)) {
          if (stryMutAct_9fa48("463")) {
            {}
          } else {
            stryCov_9fa48("463");
            throw new Error(stryMutAct_9fa48("464") ? "" : (stryCov_9fa48("464"), 'Coupon minimum not met'));
          }
        }
        return roundToInteger(stryMutAct_9fa48("465") ? subtotalCents / coupon.value : (stryCov_9fa48("465"), subtotalCents * coupon.value));
      }
    }
    const discountCents = toCents(coupon.value);
    if (stryMutAct_9fa48("469") ? discountCents <= subtotalCents : stryMutAct_9fa48("468") ? discountCents >= subtotalCents : stryMutAct_9fa48("467") ? false : stryMutAct_9fa48("466") ? true : (stryCov_9fa48("466", "467", "468", "469"), discountCents > subtotalCents)) {
      if (stryMutAct_9fa48("470")) {
        {}
      } else {
        stryCov_9fa48("470");
        throw new Error(stryMutAct_9fa48("471") ? "" : (stryCov_9fa48("471"), 'Coupon exceeds subtotal'));
      }
    }
    return discountCents;
  }
}
function allocateDiscount(lineSubtotals, discountCents) {
  if (stryMutAct_9fa48("472")) {
    {}
  } else {
    stryCov_9fa48("472");
    const shares = (stryMutAct_9fa48("473") ? new Array() : (stryCov_9fa48("473"), new Array(lineSubtotals.length))).fill(0);
    if (stryMutAct_9fa48("476") ? discountCents !== 0 : stryMutAct_9fa48("475") ? false : stryMutAct_9fa48("474") ? true : (stryCov_9fa48("474", "475", "476"), discountCents === 0)) {
      if (stryMutAct_9fa48("477")) {
        {}
      } else {
        stryCov_9fa48("477");
        return shares;
      }
    }
    const subtotalCents = lineSubtotals.reduce(stryMutAct_9fa48("478") ? () => undefined : (stryCov_9fa48("478"), (sum, cents) => stryMutAct_9fa48("479") ? sum - cents : (stryCov_9fa48("479"), sum + cents)), 0);
    let allocated = 0;
    for (let i = 0; stryMutAct_9fa48("482") ? i >= lineSubtotals.length : stryMutAct_9fa48("481") ? i <= lineSubtotals.length : stryMutAct_9fa48("480") ? false : (stryCov_9fa48("480", "481", "482"), i < lineSubtotals.length); stryMutAct_9fa48("483") ? i -= 1 : (stryCov_9fa48("483"), i += 1)) {
      if (stryMutAct_9fa48("484")) {
        {}
      } else {
        stryCov_9fa48("484");
        if (stryMutAct_9fa48("487") ? i !== lineSubtotals.length - 1 : stryMutAct_9fa48("486") ? false : stryMutAct_9fa48("485") ? true : (stryCov_9fa48("485", "486", "487"), i === (stryMutAct_9fa48("488") ? lineSubtotals.length + 1 : (stryCov_9fa48("488"), lineSubtotals.length - 1)))) {
          if (stryMutAct_9fa48("489")) {
            {}
          } else {
            stryCov_9fa48("489");
            shares[i] = stryMutAct_9fa48("490") ? discountCents + allocated : (stryCov_9fa48("490"), discountCents - allocated);
          }
        } else {
          if (stryMutAct_9fa48("491")) {
            {}
          } else {
            stryCov_9fa48("491");
            const proportional = roundToInteger(stryMutAct_9fa48("492") ? discountCents / (lineSubtotals[i] / subtotalCents) : (stryCov_9fa48("492"), discountCents * (stryMutAct_9fa48("493") ? lineSubtotals[i] * subtotalCents : (stryCov_9fa48("493"), lineSubtotals[i] / subtotalCents))));
            const share = stryMutAct_9fa48("494") ? Math.max(proportional, discountCents - allocated) : (stryCov_9fa48("494"), Math.min(proportional, stryMutAct_9fa48("495") ? discountCents + allocated : (stryCov_9fa48("495"), discountCents - allocated)));
            shares[i] = share;
            stryMutAct_9fa48("496") ? allocated -= share : (stryCov_9fa48("496"), allocated += share);
          }
        }
      }
    }
    return shares;
  }
}
function priceCheckout(items, coupon) {
  if (stryMutAct_9fa48("497")) {
    {}
  } else {
    stryCov_9fa48("497");
    if (stryMutAct_9fa48("500") ? !Array.isArray(items) && items.length === 0 : stryMutAct_9fa48("499") ? false : stryMutAct_9fa48("498") ? true : (stryCov_9fa48("498", "499", "500"), (stryMutAct_9fa48("501") ? Array.isArray(items) : (stryCov_9fa48("501"), !Array.isArray(items))) || (stryMutAct_9fa48("503") ? items.length !== 0 : stryMutAct_9fa48("502") ? false : (stryCov_9fa48("502", "503"), items.length === 0)))) {
      if (stryMutAct_9fa48("504")) {
        {}
      } else {
        stryCov_9fa48("504");
        throw new Error(stryMutAct_9fa48("505") ? "" : (stryCov_9fa48("505"), 'Cart is empty'));
      }
    }
    assertCoupon(coupon);
    const lines = items.map(item => {
      if (stryMutAct_9fa48("506")) {
        {}
      } else {
        stryCov_9fa48("506");
        if (stryMutAct_9fa48("509") ? (!item || !Number.isInteger(item.quantity)) && item.quantity <= 0 : stryMutAct_9fa48("508") ? false : stryMutAct_9fa48("507") ? true : (stryCov_9fa48("507", "508", "509"), (stryMutAct_9fa48("511") ? !item && !Number.isInteger(item.quantity) : stryMutAct_9fa48("510") ? false : (stryCov_9fa48("510", "511"), (stryMutAct_9fa48("512") ? item : (stryCov_9fa48("512"), !item)) || (stryMutAct_9fa48("513") ? Number.isInteger(item.quantity) : (stryCov_9fa48("513"), !Number.isInteger(item.quantity))))) || (stryMutAct_9fa48("516") ? item.quantity > 0 : stryMutAct_9fa48("515") ? item.quantity < 0 : stryMutAct_9fa48("514") ? false : (stryCov_9fa48("514", "515", "516"), item.quantity <= 0)))) {
          if (stryMutAct_9fa48("517")) {
            {}
          } else {
            stryCov_9fa48("517");
            throw new Error(stryMutAct_9fa48("518") ? "" : (stryCov_9fa48("518"), 'Quantity must be a positive integer'));
          }
        }
        if (stryMutAct_9fa48("521") ? (typeof item.unitPrice !== 'number' || !Number.isFinite(item.unitPrice)) && item.unitPrice < 0 : stryMutAct_9fa48("520") ? false : stryMutAct_9fa48("519") ? true : (stryCov_9fa48("519", "520", "521"), (stryMutAct_9fa48("523") ? typeof item.unitPrice !== 'number' && !Number.isFinite(item.unitPrice) : stryMutAct_9fa48("522") ? false : (stryCov_9fa48("522", "523"), (stryMutAct_9fa48("525") ? typeof item.unitPrice === 'number' : stryMutAct_9fa48("524") ? false : (stryCov_9fa48("524", "525"), typeof item.unitPrice !== (stryMutAct_9fa48("526") ? "" : (stryCov_9fa48("526"), 'number')))) || (stryMutAct_9fa48("527") ? Number.isFinite(item.unitPrice) : (stryCov_9fa48("527"), !Number.isFinite(item.unitPrice))))) || (stryMutAct_9fa48("530") ? item.unitPrice >= 0 : stryMutAct_9fa48("529") ? item.unitPrice <= 0 : stryMutAct_9fa48("528") ? false : (stryCov_9fa48("528", "529", "530"), item.unitPrice < 0)))) {
          if (stryMutAct_9fa48("531")) {
            {}
          } else {
            stryCov_9fa48("531");
            throw new Error(stryMutAct_9fa48("532") ? "" : (stryCov_9fa48("532"), 'Price must be zero or greater'));
          }
        }
        if (stryMutAct_9fa48("535") ? (typeof item.taxRate !== 'number' || !Number.isFinite(item.taxRate) || item.taxRate < 0) && item.taxRate > 1 : stryMutAct_9fa48("534") ? false : stryMutAct_9fa48("533") ? true : (stryCov_9fa48("533", "534", "535"), (stryMutAct_9fa48("537") ? (typeof item.taxRate !== 'number' || !Number.isFinite(item.taxRate)) && item.taxRate < 0 : stryMutAct_9fa48("536") ? false : (stryCov_9fa48("536", "537"), (stryMutAct_9fa48("539") ? typeof item.taxRate !== 'number' && !Number.isFinite(item.taxRate) : stryMutAct_9fa48("538") ? false : (stryCov_9fa48("538", "539"), (stryMutAct_9fa48("541") ? typeof item.taxRate === 'number' : stryMutAct_9fa48("540") ? false : (stryCov_9fa48("540", "541"), typeof item.taxRate !== (stryMutAct_9fa48("542") ? "" : (stryCov_9fa48("542"), 'number')))) || (stryMutAct_9fa48("543") ? Number.isFinite(item.taxRate) : (stryCov_9fa48("543"), !Number.isFinite(item.taxRate))))) || (stryMutAct_9fa48("546") ? item.taxRate >= 0 : stryMutAct_9fa48("545") ? item.taxRate <= 0 : stryMutAct_9fa48("544") ? false : (stryCov_9fa48("544", "545", "546"), item.taxRate < 0)))) || (stryMutAct_9fa48("549") ? item.taxRate <= 1 : stryMutAct_9fa48("548") ? item.taxRate >= 1 : stryMutAct_9fa48("547") ? false : (stryCov_9fa48("547", "548", "549"), item.taxRate > 1)))) {
          if (stryMutAct_9fa48("550")) {
            {}
          } else {
            stryCov_9fa48("550");
            throw new Error(stryMutAct_9fa48("551") ? "" : (stryCov_9fa48("551"), 'Tax rate must be between 0 and 1'));
          }
        }
        const unitPriceCents = toCents(item.unitPrice);
        return stryMutAct_9fa48("552") ? {} : (stryCov_9fa48("552"), {
          productId: item.productId,
          quantity: item.quantity,
          unitPriceCents,
          taxRate: item.taxRate,
          lineSubtotalCents: stryMutAct_9fa48("553") ? unitPriceCents / item.quantity : (stryCov_9fa48("553"), unitPriceCents * item.quantity)
        });
      }
    });
    const subtotalCents = lines.reduce(stryMutAct_9fa48("554") ? () => undefined : (stryCov_9fa48("554"), (sum, line) => stryMutAct_9fa48("555") ? sum - line.lineSubtotalCents : (stryCov_9fa48("555"), sum + line.lineSubtotalCents)), 0);
    const discountCents = discountCentsFor(subtotalCents, coupon);
    const shares = allocateDiscount(lines.map(stryMutAct_9fa48("556") ? () => undefined : (stryCov_9fa48("556"), line => line.lineSubtotalCents)), discountCents);
    const pricedLines = lines.map((line, index) => {
      if (stryMutAct_9fa48("557")) {
        {}
      } else {
        stryCov_9fa48("557");
        const lineDiscountCents = shares[index];
        const taxableCents = stryMutAct_9fa48("558") ? line.lineSubtotalCents + lineDiscountCents : (stryCov_9fa48("558"), line.lineSubtotalCents - lineDiscountCents);
        const lineTaxCents = roundToInteger(stryMutAct_9fa48("559") ? taxableCents / line.taxRate : (stryCov_9fa48("559"), taxableCents * line.taxRate));
        return stryMutAct_9fa48("560") ? {} : (stryCov_9fa48("560"), {
          productId: line.productId,
          quantity: line.quantity,
          unitPrice: fromCents(line.unitPriceCents),
          taxRate: line.taxRate,
          lineSubtotal: fromCents(line.lineSubtotalCents),
          lineDiscount: fromCents(lineDiscountCents),
          lineTax: fromCents(lineTaxCents),
          lineSubtotalCents: line.lineSubtotalCents,
          lineDiscountCents,
          lineTaxCents
        });
      }
    });
    const taxCents = pricedLines.reduce(stryMutAct_9fa48("561") ? () => undefined : (stryCov_9fa48("561"), (sum, line) => stryMutAct_9fa48("562") ? sum - line.lineTaxCents : (stryCov_9fa48("562"), sum + line.lineTaxCents)), 0);
    const taxableCents = stryMutAct_9fa48("563") ? subtotalCents + discountCents : (stryCov_9fa48("563"), subtotalCents - discountCents);
    const shippingCents = (stryMutAct_9fa48("567") ? taxableCents < SHIPPING_THRESHOLD_CENTS : stryMutAct_9fa48("566") ? taxableCents > SHIPPING_THRESHOLD_CENTS : stryMutAct_9fa48("565") ? false : stryMutAct_9fa48("564") ? true : (stryCov_9fa48("564", "565", "566", "567"), taxableCents >= SHIPPING_THRESHOLD_CENTS)) ? 0 : SHIPPING_FEE_CENTS;
    const totalCents = stryMutAct_9fa48("568") ? taxableCents + taxCents - shippingCents : (stryCov_9fa48("568"), (stryMutAct_9fa48("569") ? taxableCents - taxCents : (stryCov_9fa48("569"), taxableCents + taxCents)) + shippingCents);
    return stryMutAct_9fa48("570") ? {} : (stryCov_9fa48("570"), {
      subtotal: fromCents(subtotalCents),
      discount: fromCents(discountCents),
      taxable: fromCents(taxableCents),
      tax: fromCents(taxCents),
      shipping: fromCents(shippingCents),
      total: fromCents(totalCents),
      subtotalCents,
      discountCents,
      taxableCents,
      taxCents,
      shippingCents,
      totalCents,
      lines: pricedLines,
      coupon: interpretedCoupon(coupon, discountCents)
    });
  }
}
function interpretedCoupon(coupon, discountCents) {
  if (stryMutAct_9fa48("571")) {
    {}
  } else {
    stryCov_9fa48("571");
    if (stryMutAct_9fa48("574") ? coupon != null : stryMutAct_9fa48("573") ? false : stryMutAct_9fa48("572") ? true : (stryCov_9fa48("572", "573", "574"), coupon == null)) {
      if (stryMutAct_9fa48("575")) {
        {}
      } else {
        stryCov_9fa48("575");
        return null;
      }
    }
    if (stryMutAct_9fa48("578") ? coupon.type !== 'percent' : stryMutAct_9fa48("577") ? false : stryMutAct_9fa48("576") ? true : (stryCov_9fa48("576", "577", "578"), coupon.type === (stryMutAct_9fa48("579") ? "" : (stryCov_9fa48("579"), 'percent')))) {
      if (stryMutAct_9fa48("580")) {
        {}
      } else {
        stryCov_9fa48("580");
        return stryMutAct_9fa48("581") ? {} : (stryCov_9fa48("581"), {
          type: stryMutAct_9fa48("582") ? "" : (stryCov_9fa48("582"), 'percent'),
          value: coupon.value,
          minSubtotal: fromCents(toCents(coupon.minSubtotal))
        });
      }
    }
    return stryMutAct_9fa48("583") ? {} : (stryCov_9fa48("583"), {
      type: stryMutAct_9fa48("584") ? "" : (stryCov_9fa48("584"), 'fixed'),
      value: fromCents(discountCents)
    });
  }
}
module.exports = stryMutAct_9fa48("585") ? {} : (stryCov_9fa48("585"), {
  SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  priceCheckout
});