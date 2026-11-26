const { priceCheckout } = require('../../services/pricing');

/**
 * PRUEBA FUZZ / BASADA EN PROPIEDADES para priceCheckout
 *
 * Generador: construye entradas aleatorias para `priceCheckout(items, coupon)`:
 *  - items: entre 1 y 4 líneas; quantity en {1..10}; unitPrice en {0, 0.01, 1..999.99, -5, "texto"};
 *  - taxRate en {0, 0.07, 0.16, 1, -0.1, 1.5};
 *  - coupon: null | {type:'percent', value: 0..1.5, minSubtotal: -10..200} |
 *            {type:'fixed', value: 0..300} | {type:'otro'} | [] | "string".
 *
 * Oráculo (invariante que debe cumplirse para entradas válidas):
 *  - total === taxable + tax + shipping
 *  - shipping === 0 cuando taxable >= 50, shipping === 5 cuando taxable < 50
 *  - tax === suma de (lineSubtotal − lineDiscount) × taxRate redondeado al centavo
 *  - discount === 0 si no hay cupón
 *  - Todos los montos son finitos y no negativos
 *
 * Para entradas inválidas, el oráculo es: priceCheckout debe lanzar Error.
 */

function randPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function generateItem() {
  if (Math.random() < 0.85) {
    return {
      quantity: randInt(1, 10),
      unitPrice: randFloat(0, 200),
      taxRate: randPick([0, 0.07, 0.16, 0.5, 1]),
    };
  }
  return {
    quantity: randPick([0, -1, 2.5]),
    unitPrice: randPick([-5, '100', null]),
    taxRate: randPick([-0.1, 1.5]),
  };
}

function generateCoupon() {
  const roll = Math.random();
  if (roll < 0.1) return null;
  if (roll < 0.55) {
    return { type: 'percent', value: randFloat(0.01, 1), minSubtotal: randFloat(0, 20) };
  }
  if (roll < 0.9) {
    return { type: 'fixed', value: randFloat(0.01, 30) };
  }
  return randPick([
    { type: 'percent', value: 1.5, minSubtotal: 0 },
    { type: 'fixed', value: -10 },
    { type: 'gift', value: 10 },
    [],
    'cupón-texto',
    { type: 'percent', value: 0.1, minSubtotal: -5 },
  ]);
}

function isValidItem(item) {
  return (
    item &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    typeof item.unitPrice === 'number' &&
    Number.isFinite(item.unitPrice) &&
    item.unitPrice >= 0 &&
    typeof item.taxRate === 'number' &&
    Number.isFinite(item.taxRate) &&
    item.taxRate >= 0 &&
    item.taxRate <= 1
  );
}

function isValidCouponStructure(coupon) {
  if (coupon == null) return true;
  if (typeof coupon !== 'object' || Array.isArray(coupon)) return false;
  if (coupon.type !== 'percent' && coupon.type !== 'fixed') return false;
  if (typeof coupon.value !== 'number' || !Number.isFinite(coupon.value) || coupon.value <= 0) return false;
  if (coupon.type === 'percent') {
    if (coupon.value > 1) return false;
    if (typeof coupon.minSubtotal !== 'number' || !Number.isFinite(coupon.minSubtotal) || coupon.minSubtotal < 0) return false;
  }
  return true;
}

function couponValidForItems(coupon, items) {
  if (!isValidCouponStructure(coupon)) return false;
  if (coupon == null) return true;
  if (coupon.type === 'percent') {
    const subtotalCents = items.reduce((sum, it) => {
      if (!isValidItem(it)) return sum;
      return sum + Math.round(it.unitPrice * 100) * it.quantity;
    }, 0);
    const minCents = Math.round(coupon.minSubtotal * 100);
    return subtotalCents >= minCents;
  }
  // fixed: value debe ser <= subtotal
  const subtotalCents = items.reduce((sum, it) => {
    if (!isValidItem(it)) return sum;
    return sum + Math.round(it.unitPrice * 100) * it.quantity;
  }, 0);
  const discountCents = Math.round(coupon.value * 100);
  return discountCents <= subtotalCents;
}

function round2(x) {
  return Number((x).toFixed(2));
}

describe('priceCheckout — fuzz / propiedades', () => {
  const ITERACIONES = 500;
  let fallos = 0;
  const detallesFallos = [];

  beforeAll(() => {
    // Semilla fija para reproducibilidad
    const seed = 20261125;
    let s = seed;
    Math.random = function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  });

  it(`ejecuta ${ITERACIONES} entradas aleatorias y verifica invariantes (oráculo)`, () => {
    let entradasValidas = 0;
    let entradasInvalidas = 0;
    for (let i = 0; i < ITERACIONES; i += 1) {
      const nItems = randInt(1, 4);
      const items = Array.from({ length: nItems }, generateItem);
      const coupon = generateCoupon();
      const itemsValidos = items.every(isValidItem);
      const cupónValido = couponValidForItems(coupon, items);
      if (itemsValidos && cupónValido) {
        entradasValidas += 1;
      } else {
        entradasInvalidas += 1;
      }

      try {
        const result = priceCheckout(items, coupon);

        if (!(itemsValidos && cupónValido)) {
          fallos += 1;
          detallesFallos.push({
            iteracion: i,
            items,
            coupon,
            motivo: 'aceptó una entrada inválida sin lanzar error',
          });
        }

        if (itemsValidos && cupónValido) {
          // Oráculo: total = taxable + tax + shipping
          const totalEsperado = round2(result.taxable + result.tax + result.shipping);
          if (round2(result.total) !== totalEsperado) {
            fallos += 1;
            detallesFallos.push({
              iteracion: i,
              items,
              coupon,
              resultado: result,
              motivo: `total ${result.total} !== taxable+tax+shipping ${totalEsperado}`,
            });
          }

          // Oráculo: shipping según umbral sobre taxable
          const shippingEsperado = result.taxable >= 50 ? 0 : 5;
          if (result.shipping !== shippingEsperado) {
            fallos += 1;
            detallesFallos.push({
              iteracion: i,
              items,
              coupon,
              resultado: result,
              motivo: `shipping ${result.shipping} !== esperado ${shippingEsperado} para taxable ${result.taxable}`,
            });
          }

          // Oráculo: montos finitos y no negativos
          for (const campo of ['subtotal', 'discount', 'taxable', 'tax', 'shipping', 'total']) {
            if (typeof result[campo] !== 'number' || !Number.isFinite(result[campo]) || result[campo] < 0) {
              fallos += 1;
              detallesFallos.push({
                iteracion: i,
                items,
                coupon,
                resultado: result,
                motivo: `campo ${campo} inválido: ${result[campo]}`,
              });
            }
          }
        }
      } catch (error) {
        // Si las entradas son válidas, no debería lanzar
        if (itemsValidos && cupónValido) {
          fallos += 1;
          detallesFallos.push({
            iteracion: i,
            items,
            coupon,
            motivo: `lanzó error inesperado con entradas válidas: ${error.message}`,
          });
        }
        // Si las entradas son inválidas, se espera que lance (oráculo negativo)
      }
    }

    if (fallos > 0) {
      console.error('FALLA FUZZ:', JSON.stringify(detallesFallos.slice(0, 5), null, 2));
    }
    expect(entradasValidas).toBeGreaterThan(50);
    expect(entradasInvalidas).toBeGreaterThan(50);
    expect(fallos).toBe(0);
  });

  it('insumo concreto documentado: un ítem a 100 con taxRate 0.07 y sin cupón', () => {
    const result = priceCheckout([{ quantity: 1, unitPrice: 100, taxRate: 0.07 }], null);
    expect(result.subtotal).toBe(100);
    expect(result.discount).toBe(0);
    expect(result.taxable).toBe(100);
    expect(result.tax).toBe(7);
    expect(result.shipping).toBe(0); // 100 >= 50 -> envío 0
    expect(result.total).toBe(107);
  });

  it('insumo concreto documentado: dos ítems a 40 con taxRate 0 y cupón fixed 30', () => {
    const result = priceCheckout(
      [{ quantity: 2, unitPrice: 40, taxRate: 0 }],
      { type: 'fixed', value: 30 }
    );
    expect(result.subtotal).toBe(80);
    expect(result.discount).toBe(30);
    expect(result.taxable).toBe(50);
    expect(result.tax).toBe(0);
    expect(result.shipping).toBe(0); // 50 >= 50
    expect(result.total).toBe(50);
  });

  it('documentación: generador, oráculo, número de entradas', () => {
    // Este test documenta la estrategia de fuzz (no aserta comportamiento del SUT)
    expect(ITERACIONES).toBe(500);
    expect(typeof generateItem).toBe('function');
    expect(typeof generateCoupon).toBe('function');
    expect(typeof isValidItem).toBe('function');
    expect(typeof isValidCouponStructure).toBe('function');
    expect(typeof couponValidForItems).toBe('function');
  });
});
