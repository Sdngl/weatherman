// Cookie utility functions for auth data
// 2-hour expiration for security

const COOKIE_EXPIRY_HOURS = 2;

/**
 * Set a cookie with 2-hour expiration
 */
export function setCookie(name, value, hours = COOKIE_EXPIRY_HOURS) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Strict`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Clear a specific cookie
 */
export function clearCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Clear all auth cookies
 */
export function clearAllAuthCookies() {
  clearCookie('uid');
  clearCookie('accessToken');
  clearCookie('displayName');
  clearCookie('photoURL');
}

/**
 * Store user auth data in cookies
 */
export function storeAuthData(user, accessToken) {
  setCookie('uid', user.uid);
  setCookie('accessToken', accessToken);
  setCookie('displayName', user.displayName || '');
  setCookie('photoURL', user.photoURL || '');
}

/**
 * Check if user session is still valid
 */
export function isSessionValid() {
  const uid = getCookie('uid');
  const accessToken = getCookie('accessToken');
  return !!(uid && accessToken);
}