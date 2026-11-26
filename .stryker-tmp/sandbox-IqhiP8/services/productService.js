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
const Product = require('../models/product');
const Category = require('../models/category');
const {
  Op
} = require('sequelize');
class ProductService {
  static async getAllProducts() {
    if (stryMutAct_9fa48("586")) {
      {}
    } else {
      stryCov_9fa48("586");
      return await Product.findAll();
    }
  }
  static async getProductById(id) {
    if (stryMutAct_9fa48("587")) {
      {}
    } else {
      stryCov_9fa48("587");
      return await Product.findByPk(id);
    }
  }
  static async createProduct(product) {
    if (stryMutAct_9fa48("588")) {
      {}
    } else {
      stryCov_9fa48("588");
      // Check if category exists
      const category = await Category.findByPk(product.categoryId);
      if (stryMutAct_9fa48("591") ? false : stryMutAct_9fa48("590") ? true : stryMutAct_9fa48("589") ? category : (stryCov_9fa48("589", "590", "591"), !category)) {
        if (stryMutAct_9fa48("592")) {
          {}
        } else {
          stryCov_9fa48("592");
          throw new Error(stryMutAct_9fa48("593") ? `` : (stryCov_9fa48("593"), `Category with id ${product.categoryId} does not exist`));
        }
      }
      return await Product.create(product);
    }
  }
  static async updateProduct(id, product) {
    if (stryMutAct_9fa48("594")) {
      {}
    } else {
      stryCov_9fa48("594");
      // If categoryId is being updated, check if new category exists
      if (stryMutAct_9fa48("596") ? false : stryMutAct_9fa48("595") ? true : (stryCov_9fa48("595", "596"), product.categoryId)) {
        if (stryMutAct_9fa48("597")) {
          {}
        } else {
          stryCov_9fa48("597");
          const category = await Category.findByPk(product.categoryId);
          if (stryMutAct_9fa48("600") ? false : stryMutAct_9fa48("599") ? true : stryMutAct_9fa48("598") ? category : (stryCov_9fa48("598", "599", "600"), !category)) {
            if (stryMutAct_9fa48("601")) {
              {}
            } else {
              stryCov_9fa48("601");
              throw new Error(stryMutAct_9fa48("602") ? `` : (stryCov_9fa48("602"), `Category with id ${product.categoryId} does not exist`));
            }
          }
        }
      }
      return await Product.update(product, stryMutAct_9fa48("603") ? {} : (stryCov_9fa48("603"), {
        where: stryMutAct_9fa48("604") ? {} : (stryCov_9fa48("604"), {
          id
        })
      }));
    }
  }
  static async deleteProduct(id) {
    if (stryMutAct_9fa48("605")) {
      {}
    } else {
      stryCov_9fa48("605");
      return await Product.destroy(stryMutAct_9fa48("606") ? {} : (stryCov_9fa48("606"), {
        where: stryMutAct_9fa48("607") ? {} : (stryCov_9fa48("607"), {
          id
        })
      }));
    }
  }
  static async getProductsByCategory(categoryId, options = {}) {
    if (stryMutAct_9fa48("608")) {
      {}
    } else {
      stryCov_9fa48("608");
      const {
        sort,
        limit,
        offset
      } = options;
      const queryOptions = stryMutAct_9fa48("609") ? {} : (stryCov_9fa48("609"), {
        where: stryMutAct_9fa48("610") ? {} : (stryCov_9fa48("610"), {
          categoryId
        }),
        include: Category
      });

      // Add sorting if specified
      if (stryMutAct_9fa48("612") ? false : stryMutAct_9fa48("611") ? true : (stryCov_9fa48("611", "612"), sort)) {
        if (stryMutAct_9fa48("613")) {
          {}
        } else {
          stryCov_9fa48("613");
          queryOptions.order = stryMutAct_9fa48("614") ? [] : (stryCov_9fa48("614"), [sort.split(stryMutAct_9fa48("615") ? "" : (stryCov_9fa48("615"), ','))]); // e.g. "price,DESC"
        }
      }

      // Add pagination if specified
      if (stryMutAct_9fa48("617") ? false : stryMutAct_9fa48("616") ? true : (stryCov_9fa48("616", "617"), limit)) {
        if (stryMutAct_9fa48("618")) {
          {}
        } else {
          stryCov_9fa48("618");
          queryOptions.limit = parseInt(limit);
        }
      }
      if (stryMutAct_9fa48("620") ? false : stryMutAct_9fa48("619") ? true : (stryCov_9fa48("619", "620"), offset)) {
        if (stryMutAct_9fa48("621")) {
          {}
        } else {
          stryCov_9fa48("621");
          queryOptions.offset = parseInt(offset);
        }
      }
      return await Product.findAll(queryOptions);
    }
  }
  static async getProductsByCategories(categoryIdsStr, options = {}) {
    if (stryMutAct_9fa48("622")) {
      {}
    } else {
      stryCov_9fa48("622");
      // Get categories from query parameter: ?categories=1,2,3
      const categoryIds = categoryIdsStr ? categoryIdsStr.split(stryMutAct_9fa48("623") ? "" : (stryCov_9fa48("623"), ',')).map(stryMutAct_9fa48("624") ? () => undefined : (stryCov_9fa48("624"), id => parseInt(id))) : stryMutAct_9fa48("625") ? ["Stryker was here"] : (stryCov_9fa48("625"), []);
      if (stryMutAct_9fa48("628") ? false : stryMutAct_9fa48("627") ? true : stryMutAct_9fa48("626") ? categoryIds.length : (stryCov_9fa48("626", "627", "628"), !categoryIds.length)) {
        if (stryMutAct_9fa48("629")) {
          {}
        } else {
          stryCov_9fa48("629");
          throw new Error(stryMutAct_9fa48("630") ? "" : (stryCov_9fa48("630"), 'Categories parameter is required'));
        }
      }
      const {
        sort,
        limit,
        offset
      } = options;
      const queryOptions = stryMutAct_9fa48("631") ? {} : (stryCov_9fa48("631"), {
        where: stryMutAct_9fa48("632") ? {} : (stryCov_9fa48("632"), {
          categoryId: stryMutAct_9fa48("633") ? {} : (stryCov_9fa48("633"), {
            [Op.in]: Array.isArray(categoryIds) ? categoryIds : stryMutAct_9fa48("634") ? [] : (stryCov_9fa48("634"), [categoryIds])
          })
        }),
        include: Category
      });

      // Add sorting if specified
      if (stryMutAct_9fa48("636") ? false : stryMutAct_9fa48("635") ? true : (stryCov_9fa48("635", "636"), sort)) {
        if (stryMutAct_9fa48("637")) {
          {}
        } else {
          stryCov_9fa48("637");
          queryOptions.order = stryMutAct_9fa48("638") ? [] : (stryCov_9fa48("638"), [sort.split(stryMutAct_9fa48("639") ? "" : (stryCov_9fa48("639"), ','))]);
        }
      }

      // Add pagination if specified
      if (stryMutAct_9fa48("641") ? false : stryMutAct_9fa48("640") ? true : (stryCov_9fa48("640", "641"), limit)) {
        if (stryMutAct_9fa48("642")) {
          {}
        } else {
          stryCov_9fa48("642");
          queryOptions.limit = parseInt(limit);
        }
      }
      if (stryMutAct_9fa48("644") ? false : stryMutAct_9fa48("643") ? true : (stryCov_9fa48("643", "644"), offset)) {
        if (stryMutAct_9fa48("645")) {
          {}
        } else {
          stryCov_9fa48("645");
          queryOptions.offset = parseInt(offset);
        }
      }
      return await Product.findAll(queryOptions);
    }
  }
}
module.exports = ProductService;