// Configuración de Jest usada solo por Stryker para la corrida "modelo tal cual" (IA sin editar).
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/ai-generated/pricing.ai-original.test.js'],
};
