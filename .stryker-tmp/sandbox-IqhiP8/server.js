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
  app,
  sequelize
} = require('./app');
const PORT = stryMutAct_9fa48("180") ? process.env.PORT && 3000 : stryMutAct_9fa48("179") ? false : stryMutAct_9fa48("178") ? true : (stryCov_9fa48("178", "179", "180"), process.env.PORT || 3000);
async function start() {
  if (stryMutAct_9fa48("181")) {
    {}
  } else {
    stryCov_9fa48("181");
    // An interrupted sync({ alter: true }) leaves these scratch tables.
    // The next boot then inserts into them and hits a unique constraint on id.
    await sequelize.query(stryMutAct_9fa48("182") ? "" : (stryCov_9fa48("182"), 'DROP TABLE IF EXISTS `Categories_backup`'));
    await sequelize.query(stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), 'DROP TABLE IF EXISTS `Carts_backup`'));
    await sequelize.query(stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), 'DROP TABLE IF EXISTS `Products_backup`'));
    await sequelize.query(stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), 'DROP TABLE IF EXISTS `CartItems_backup`'));
    await sequelize.query(stryMutAct_9fa48("186") ? "" : (stryCov_9fa48("186"), 'DROP TABLE IF EXISTS `Orders_backup`'));
    await sequelize.query(stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), 'DROP TABLE IF EXISTS `OrderLines_backup`'));

    // Create missing tables only. alter rebuilds SQLite tables that have a
    // UNIQUE column, and that rebuild fails on the next start.
    await sequelize.sync();
    const [cartColumns] = await sequelize.query(stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), 'PRAGMA table_info(`Carts`)'));
    const hasStatus = stryMutAct_9fa48("189") ? cartColumns.every(column => column.name === 'status') : (stryCov_9fa48("189"), cartColumns.some(stryMutAct_9fa48("190") ? () => undefined : (stryCov_9fa48("190"), column => stryMutAct_9fa48("193") ? column.name !== 'status' : stryMutAct_9fa48("192") ? false : stryMutAct_9fa48("191") ? true : (stryCov_9fa48("191", "192", "193"), column.name === (stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), 'status'))))));
    if (stryMutAct_9fa48("197") ? false : stryMutAct_9fa48("196") ? true : stryMutAct_9fa48("195") ? hasStatus : (stryCov_9fa48("195", "196", "197"), !hasStatus)) {
      if (stryMutAct_9fa48("198")) {
        {}
      } else {
        stryCov_9fa48("198");
        await sequelize.query(stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), "ALTER TABLE `Carts` ADD `status` VARCHAR(255) NOT NULL DEFAULT 'open'"));
      }
    }
    app.listen(PORT, () => {
      if (stryMutAct_9fa48("200")) {
        {}
      } else {
        stryCov_9fa48("200");
        console.log(stryMutAct_9fa48("201") ? `` : (stryCov_9fa48("201"), `Server is running on http://localhost:${PORT}`));
        console.log(stryMutAct_9fa48("202") ? "" : (stryCov_9fa48("202"), 'Database synced successfully'));
      }
    });
  }
}
start().catch(error => {
  if (stryMutAct_9fa48("203")) {
    {}
  } else {
    stryCov_9fa48("203");
    console.error(stryMutAct_9fa48("204") ? "" : (stryCov_9fa48("204"), 'Unable to sync database:'), error);
  }
});