export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  debugPhysics: process.env.NEXT_PUBLIC_DEBUG_PHYSICS === 'true',
} as const;
