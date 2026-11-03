// Switch only after replacing the placeholder company, artwork and privacy notice.
export const launchApproved = false;

export function resolvePublicSite(env = {}) {
  let siteUrl = '';
  try {
    const url = new URL(env.VITE_SITE_URL);
    if (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !/^(localhost|127\.|0\.|\[::1\])/.test(url.hostname)
    ) {
      siteUrl = url.origin;
    }
  } catch {
    /* Missing configuration keeps the review site functional. */
  }

  const indexable = launchApproved && env.VITE_SITE_STAGE === 'production' && Boolean(siteUrl);
  return { siteUrl, indexable, review: !indexable };
}

export const publicSite = resolvePublicSite(import.meta.env);
