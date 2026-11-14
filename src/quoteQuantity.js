export const MAX_QUOTE_QUANTITY = 9999;

export function normalizeQuantity(value) {
  const quantity = Number(value);
  return Number.isFinite(quantity)
    ? Math.max(1, Math.min(MAX_QUOTE_QUANTITY, Math.trunc(quantity)))
    : 1;
}

export function addQuoteQuantity(items, id, quantity = 1) {
  const amount = normalizeQuantity(quantity);
  const existing = items.find(item => item.id === id);
  return existing
    ? items.map(item => item.id === id
      ? { ...item, quantity: Math.min(MAX_QUOTE_QUANTITY, normalizeQuantity(item.quantity) + amount) }
      : item)
    : [...items, { id, quantity: amount }];
}

export function normalizeQuote(items, products) {
  if (!Array.isArray(items)) return [];
  return items.reduce((result, item) => products.some(product => product.id === item?.id)
    ? addQuoteQuantity(result, item.id, item.quantity)
    : result, []);
}
