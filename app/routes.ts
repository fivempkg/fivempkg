import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signup", "routes/auth/signup.tsx"),
  route("/api/auth/*", "routes/api/auth/auth.ts"),
] satisfies RouteConfig;
