export const getImageUrl = (path) => {
  if (!path) return '/logo_knowchamp.png';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  return path.startsWith('/') ? path : `/${path}`;
};
