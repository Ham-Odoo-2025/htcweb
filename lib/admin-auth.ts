import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'htc@admin2025';
const SESSION_COOKIE_NAME = 'htc_admin_session';

export function getExpectedToken(): string {
  // Simple deterministic token based on password
  let hash = 0;
  const str = `htc-admin-${ADMIN_PASSWORD}-salt-2025`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'sess_' + Math.abs(hash).toString(36) + 'htc974';
}

export function verifyAdminPassword(password: string): boolean {
  return password.trim() === ADMIN_PASSWORD.trim();
}

export function isAdminAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return token === getExpectedToken();
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME };
