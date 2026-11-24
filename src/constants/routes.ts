export const ROUTES = {
  AUTH: {
    BASE: "/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
    ME: "/me",
  },
  POSTS: {
    BASE: "/posts",
    BY_ID: "/:id",
  },
  CATEGORIES: {
    BASE: "/categories",
  },
} as const;
