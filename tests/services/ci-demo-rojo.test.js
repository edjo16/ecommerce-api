// Demostración de CI: esta prueba falla a propósito para verificar que el job test queda en rojo.
describe('CI demo: suite en rojo', () => {
  it('falla deliberadamente para comprobar que el job test se marca como fallido', () => {
    expect(1 + 1).toBe(3);
  });
});
