// Resolve public assets under both repository Pages and a custom domain.
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
