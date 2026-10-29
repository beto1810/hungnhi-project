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
  description: category.description || category.children.slice(0, 3).map(child => child.name).join(' · '),
  children: category.children.map(child => ({
    ...child,
    id: child.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  })),
  image: assetUrl(category.image),
}));
