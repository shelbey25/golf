import { golfUserRouter } from "./routers/golf_user";
import { courseRouter } from "./routers/golf_course";
import { createTRPCRouter } from "./trpc";
import { golfSessionRouter } from "./routers/golf_session";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  golf_user: golfUserRouter,
  courses: courseRouter,
  golf_session: golfSessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
