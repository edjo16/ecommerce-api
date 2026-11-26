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
const router = express.Router();
const ProductService = require('../services/productService');

// Create a product
router.post(stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("157")) {
    {}
  } else {
    stryCov_9fa48("157");
    try {
      if (stryMutAct_9fa48("158")) {
        {}
      } else {
        stryCov_9fa48("158");
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
      }
    } catch (error) {
      if (stryMutAct_9fa48("159")) {
        {}
      } else {
        stryCov_9fa48("159");
        res.status(400).json(stryMutAct_9fa48("160") ? {} : (stryCov_9fa48("160"), {
          error: error.message
        }));
      }
    }
  }
});

// Get all products
router.get(stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("162")) {
    {}
  } else {
    stryCov_9fa48("162");
    try {
      if (stryMutAct_9fa48("163")) {
        {}
      } else {
        stryCov_9fa48("163");
        const products = await ProductService.getAllProducts();
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("164")) {
        {}
      } else {
        stryCov_9fa48("164");
        res.status(500).json(stryMutAct_9fa48("165") ? {} : (stryCov_9fa48("165"), {
          error: error.message
        }));
      }
    }
  }
});

// Get products by category
router.get(stryMutAct_9fa48("166") ? "" : (stryCov_9fa48("166"), '/category/:categoryId'), async (req, res) => {
  if (stryMutAct_9fa48("167")) {
    {}
  } else {
    stryCov_9fa48("167");
    try {
      if (stryMutAct_9fa48("168")) {
        {}
      } else {
        stryCov_9fa48("168");
        const options = stryMutAct_9fa48("169") ? {} : (stryCov_9fa48("169"), {
          sort: req.query.sort,
          limit: req.query.limit,
          offset: req.query.offset
        });
        const products = await ProductService.getProductsByCategory(req.params.categoryId, options);
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("170")) {
        {}
      } else {
        stryCov_9fa48("170");
        res.status(400).json(stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
          error: error.message
        }));
      }
    }
  }
});

// Get products by multiple categories
router.get(stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), '/categories'), async (req, res) => {
  if (stryMutAct_9fa48("173")) {
    {}
  } else {
    stryCov_9fa48("173");
    try {
      if (stryMutAct_9fa48("174")) {
        {}
      } else {
        stryCov_9fa48("174");
        const options = stryMutAct_9fa48("175") ? {} : (stryCov_9fa48("175"), {
          sort: req.query.sort,
          limit: req.query.limit,
          offset: req.query.offset
        });
        const products = await ProductService.getProductsByCategories(req.query.categories, options);
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("176")) {
        {}
      } else {
        stryCov_9fa48("176");
        res.status(400).json(stryMutAct_9fa48("177") ? {} : (stryCov_9fa48("177"), {
          error: error.message
        }));
      }
    }
  }
});
module.exports = router;