// Keep public assets working on both localhost and a GitHub Pages project URL.
export function assetUrl(value) {
  return value?.startsWith('/assets/') ? `${import.meta.env.BASE_URL}${value.slice(1)}` : value;
}
