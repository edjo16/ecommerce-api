const { priceCheckout, SHIPPING_THRESHOLD, SHIPPING_FEE } = require('../../services/pricing');

describe('priceCheckout', () => {
  describe('envío y umbral', () => {
    it('aplica envío 0 cuando el subtotal alcanza 50', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 50, taxRate: 0 }], null);
      expect(result.shipping).toBe(0);
      expect(result.total).toBe(50);
    });

    it('aplica envío 5 cuando el subtotal está por debajo de 50', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 40, taxRate: 0 }], null);
      expect(result.shipping).toBe(5);
      expect(result.total).toBe(45);
    });
  });

  describe('cálculo sin cupón', () => {
    it('calcula subtotal, impuesto y total correctamente', () => {
      const result = priceCheckout([{ quantity: 2, unitPrice: 100, taxRate: 0.07 }], null);
      expect(result.subtotal).toBe(200);
      expect(result.discount).toBe(0);
      expect(result.tax).toBeCloseTo(14, 2);
      expect(result.total).toBe(214);
    });
  });

  describe('cupón por porcentaje', () => {
    it('aplica descuento porcentual cuando se cumple el minSubtotal', () => {
      const result = priceCheckout(
        [{ quantity: 2, unitPrice: 100, taxRate: 0.07 }],
        { type: 'percent', value: 0.1, minSubtotal: 50 }
      );
      expect(result.subtotal).toBe(200);
      expect(result.discount).toBe(20);
      expect(result.total).toBeCloseTo(192.6, 2);
    });

    it('rechaza cuando el subtotal está por debajo del minSubtotal', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 40, taxRate: 0 }], {
          type: 'percent', value: 0.1, minSubtotal: 50
        })
      ).toThrow('Coupon minimum not met');
    });

    it('rechaza porcentaje mayor que 1', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], {
          type: 'percent', value: 1.5, minSubtotal: 0
        })
      ).toThrow('Percent coupon cannot exceed 1');
    });
  });

  describe('cupón monto fijo', () => {
    it('aplica descuento fijo', () => {
      const result = priceCheckout(
        [{ quantity: 2, unitPrice: 100, taxRate: 0 }],
        { type: 'fixed', value: 25 }
      );
      expect(result.subtotal).toBe(200);
      expect(result.discount).toBe(25);
      expect(result.total).toBe(175);
    });

    it('rechaza cupón fijo que excede el subtotal', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 40, taxRate: 0 }], {
          type: 'fixed', value: 50
        })
      ).toThrow('Coupon exceeds subtotal');
    });
  });

  describe('validación de entradas', () => {
    it('rechaza carrito vacío', () => {
      expect(() => priceCheckout([], null)).toThrow('Cart is empty');
    });

    it('rechaza cantidad cero', () => {
      expect(() =>
        priceCheckout([{ quantity: 0, unitPrice: 100, taxRate: 0 }], null)
      ).toThrow('Quantity must be a positive integer');
    });

    it('rechaza precio negativo', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: -5, taxRate: 0 }], null)
      ).toThrow('Price must be zero or greater');
    });

    it('rechaza taxRate fuera de rango', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 1.5 }], null)
      ).toThrow('Tax rate must be between 0 and 1');
    });
  });

  describe('validación de cupón', () => {
    it('rechaza cupón que es arreglo', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], [{ type: 'percent', value: 0.1, minSubtotal: 0 }])
      ).toThrow('Only one coupon is allowed');
    });

    it('rechaza tipo de cupón inválido', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], { type: 'gift', value: 10 })
      ).toThrow('Coupon type must be percent or fixed');
    });
  });

  describe('constantes', () => {
    it('SHIPPING_THRESHOLD es 50 y SHIPPING_FEE es 5', () => {
      expect(SHIPPING_THRESHOLD).toBe(50);
      expect(SHIPPING_FEE).toBe(5);
    });
  });
});
