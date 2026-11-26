// Configuración de Jest usada solo por Stryker para la corrida "modelo revisado" (IA tras revisión).
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/ai-generated/pricing.ai-reviewed.test.js'],
};
