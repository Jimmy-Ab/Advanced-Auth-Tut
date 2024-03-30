/**
 * An array of routes that are accessible to the public
 * the routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"