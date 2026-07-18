export const COOKIE_NAME = "revylo_auth";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export const NOT_ADMIN_ERR_MSG = "You do not have admin privileges";
export const UNAUTHED_ERR_MSG = "You must be logged in to perform this action";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = process.env.NEXT_PUBLIC_OAUTH_PORTAL_URL;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  
  // If OAuth is not configured, return a placeholder URL
  if (!oauthPortalUrl || !appId) {
    console.warn('OAuth not configured. Set NEXT_PUBLIC_OAUTH_PORTAL_URL and NEXT_PUBLIC_APP_ID in .env file');
    return '#'; // Return a safe placeholder
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
