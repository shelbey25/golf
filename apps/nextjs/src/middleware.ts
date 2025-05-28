import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/upload",
    "/aboutUs",
    "/faqSwoop",
    "/supportSwoop",
    "/terms",
    "/privacy",
    "/cookie",
    "/community",
    "/safety",
    "/api/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
