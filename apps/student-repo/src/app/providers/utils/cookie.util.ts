export enum Cookie {
  STORAGE_SESSION = 'storage-session',
  STORAGE_TICKET = 'storage-ticket',
}

export function getCookieValue(name: string) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
