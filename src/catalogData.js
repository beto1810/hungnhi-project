import productRecords from './products.json';
import categoryRecords from './categories.json';
import { assetUrl } from './assets.js';

export const products = productRecords.map(product => ({
  ...product,
  image: assetUrl(product.image),
  images: product.images?.map(assetUrl),
}));
export const categories = categoryRecords.map(category => ({
  ...category,
  image: assetUrl(category.image),
}));
