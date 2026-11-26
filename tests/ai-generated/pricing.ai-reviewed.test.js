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

    it('aplica envío 5 cuando la base tras descuento cae por debajo de 50', () => {
      const result = priceCheckout(
        [{ quantity: 1, unitPrice: 60, taxRate: 0 }],
        { type: 'fixed', value: 15 }
      );
      expect(result.taxable).toBe(45);
      expect(result.shipping).toBe(5);
      expect(result.total).toBe(50);
    });
  });

  describe('cálculo sin cupón', () => {
    it('calcula subtotal, impuesto y total correctamente', () => {
      const result = priceCheckout([{ quantity: 2, unitPrice: 100, taxRate: 0.07 }], null);
      expect(result.subtotal).toBe(200);
      expect(result.discount).toBe(0);
      expect(result.taxable).toBe(200);
      expect(result.tax).toBeCloseTo(14, 2);
      expect(result.shipping).toBe(0);
      expect(result.total).toBe(214);
      expect(result.totalCents).toBe(21400);
    });

    it('una unidad a 40 con taxRate 0 -> envío 5, total 45', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 40, taxRate: 0 }], null);
      expect(result.subtotal).toBe(40);
      expect(result.tax).toBe(0);
      expect(result.shipping).toBe(5);
      expect(result.total).toBe(45);
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
      expect(result.taxable).toBe(180);
      expect(result.tax).toBeCloseTo(12.6, 2);
      expect(result.total).toBeCloseTo(192.6, 2);
      expect(result.coupon.type).toBe('percent');
      expect(result.coupon.value).toBe(0.1);
    });

    it('acepta el valor límite value = 1 (100 % de descuento)', () => {
      const result = priceCheckout(
        [{ quantity: 1, unitPrice: 100, taxRate: 0 }],
        { type: 'percent', value: 1, minSubtotal: 0 }
      );
      expect(result.discount).toBe(100);
      expect(result.taxable).toBe(0);
      expect(result.coupon.type).toBe('percent');
      expect(result.total).toBe(5);
    });

    it('aplica cupón cuando el subtotal es igual al minSubtotal (límite)', () => {
      const result = priceCheckout(
        [{ quantity: 1, unitPrice: 50, taxRate: 0 }],
        { type: 'percent', value: 0.2, minSubtotal: 50 }
      );
      expect(result.discount).toBe(10);
      expect(result.taxable).toBe(40);
      expect(result.coupon.type).toBe('percent');
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

    it('rechaza minSubtotal negativo', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], {
          type: 'percent', value: 0.1, minSubtotal: -10
        })
      ).toThrow('Percent coupon requires a minimum subtotal');
    });
  });

  describe('cupón monto fijo', () => {
    it('aplica descuento fijo y redondea al centavo', () => {
      const result = priceCheckout(
        [{ quantity: 2, unitPrice: 100, taxRate: 0 }],
        { type: 'fixed', value: 25 }
      );
      expect(result.subtotal).toBe(200);
      expect(result.discount).toBe(25);
      expect(result.taxable).toBe(175);
      expect(result.coupon.type).toBe('fixed');
      expect(result.total).toBe(175);
    });

    it('rechaza cupón fijo que excede el subtotal', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 40, taxRate: 0 }], {
          type: 'fixed', value: 50
        })
      ).toThrow('Coupon exceeds subtotal');
    });

    it('acepta cupón fijo igual al subtotal (base queda en 0)', () => {
      const result = priceCheckout(
        [{ quantity: 1, unitPrice: 50, taxRate: 0 }],
        { type: 'fixed', value: 50 }
      );
      expect(result.discount).toBe(50);
      expect(result.taxable).toBe(0);
      expect(result.shipping).toBe(5);
      expect(result.total).toBe(5);
      expect(result.coupon.type).toBe('fixed');
      expect(result.coupon.value).toBe(50);
    });

    it('cupón fijo no consulta minSubtotal', () => {
      const result = priceCheckout(
        [{ quantity: 1, unitPrice: 100, taxRate: 0 }],
        { type: 'fixed', value: 30, minSubtotal: 9999 }
      );
      expect(result.discount).toBe(30);
      expect(result.coupon.type).toBe('fixed');
      expect(result.total).toBe(70);
    });
  });

  describe('validación de entradas (ítems)', () => {
    it('rechaza carrito vacío', () => {
      expect(() => priceCheckout([], null)).toThrow('Cart is empty');
    });

    it('rechaza cantidad cero', () => {
      expect(() =>
        priceCheckout([{ quantity: 0, unitPrice: 100, taxRate: 0 }], null)
      ).toThrow('Quantity must be a positive integer');
    });

    it('rechaza cantidad negativa', () => {
      expect(() =>
        priceCheckout([{ quantity: -1, unitPrice: 100, taxRate: 0 }], null)
      ).toThrow('Quantity must be a positive integer');
    });

    it('rechaza cantidad no entera', () => {
      expect(() =>
        priceCheckout([{ quantity: 2.5, unitPrice: 100, taxRate: 0 }], null)
      ).toThrow('Quantity must be a positive integer');
    });

    it('rechaza precio negativo', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: -5, taxRate: 0 }], null)
      ).toThrow('Price must be zero or greater');
    });

    it('rechaza unitPrice como string (no número)', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: '100', taxRate: 0 }], null)
      ).toThrow('Price must be zero or greater');
    });

    it('acepta precio cero', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 0, taxRate: 0 }], null);
      expect(result.total).toBe(5);
    });

    it('rechaza taxRate fuera de 0 a 1 (negativo)', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: -0.1 }], null)
      ).toThrow('Tax rate must be between 0 and 1');
    });

    it('rechaza taxRate fuera de 0 a 1 (mayor que 1)', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 1.5 }], null)
      ).toThrow('Tax rate must be between 0 and 1');
    });

    it('acepta taxRate 0 y taxRate 1 (límites)', () => {
      const r0 = priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], null);
      expect(r0.tax).toBe(0);
      const r1 = priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 1 }], null);
      expect(r1.tax).toBe(100);
    });
  });

  describe('validación de cupón', () => {
    it('rechaza cupón que es un arreglo', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], [{ type: 'percent', value: 0.1, minSubtotal: 0 }])
      ).toThrow('Only one coupon is allowed');
    });

    it('rechaza cupón como string (no objeto ni arreglo)', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], 'cupón-inválido')
      ).toThrow('Only one coupon is allowed');
    });

    it('rechaza tipo de cupón inválido', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], { type: 'gift', value: 10 })
      ).toThrow('Coupon type must be percent or fixed');
    });

    it('rechaza valor que no es número mayor que cero', () => {
      expect(() =>
        priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], {
          type: 'percent', value: 0, minSubtotal: 0
        })
      ).toThrow('Coupon value must be greater than zero');
    });

    it('acepta ausencia de cupón (null)', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], null);
      expect(result.coupon).toBeNull();
      expect(result.discount).toBe(0);
    });

    it('acepta ausencia de cupón (undefined)', () => {
      const result = priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0 }], undefined);
      expect(result.coupon).toBeNull();
    });
  });

  describe('reparto del descuento entre líneas', () => {
    it('reparte descuento proporcional; última línea recibe el resto', () => {
      const result = priceCheckout(
        [
          { quantity: 1, unitPrice: 100, taxRate: 0 },
          { quantity: 1, unitPrice: 300, taxRate: 0 }
        ],
        { type: 'percent', value: 0.1, minSubtotal: 0 }
      );
      expect(result.lines[0].lineDiscount).toBe(10);
      expect(result.lines[1].lineDiscount).toBe(30);
      expect(result.discount).toBe(40);
    });

    it('cada descuento de línea queda entre 0 y el subtotal de esa línea', () => {
      const result = priceCheckout(
        [
          { quantity: 1, unitPrice: 10, taxRate: 0 },
          { quantity: 1, unitPrice: 10, taxRate: 0 },
          { quantity: 1, unitPrice: 10, taxRate: 0 }
        ],
        { type: 'fixed', value: 25 }
      );
      result.lines.forEach(line => {
        expect(line.lineDiscount).toBeGreaterThanOrEqual(0);
        expect(line.lineDiscount).toBeLessThanOrEqual(10);
      });
      expect(result.discount).toBe(25);
    });
  });

  describe('constantes', () => {
    it('SHIPPING_THRESHOLD es 50 y SHIPPING_FEE es 5', () => {
      expect(SHIPPING_THRESHOLD).toBe(50);
      expect(SHIPPING_FEE).toBe(5);
    });
  });
});
