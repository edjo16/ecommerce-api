// Configuración de Jest usada solo por Stryker para la corrida "suite propia".
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/services/pricing.test.js'],
};
