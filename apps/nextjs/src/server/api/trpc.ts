/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { decodeJwt, sessions } from "@clerk/clerk-sdk-node";
import {
  clerkClient,
  getAuth,
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "../db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
  session: SignedInAuthObject | SignedOutAuthObject;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = getAuth(req);
  console.log("*******");
  //console.log(req);
  console.log(session.debug());
  console.log(session.sessionClaims);
  if (!session.userId) {
    try {
      const auth = req.headers.authorization || "";
      const clerkToken = auth.replace("Bearer ", "");
      const decodeInfo = decodeJwt(clerkToken);
      const sessionId = decodeInfo.payload.sid;

      const clerkSession = await sessions.verifySession(sessionId, clerkToken);
      const altSes: SignedInAuthObject = {
        sessionClaims: session.sessionClaims || {
          __raw: "",
          iss: "",
          sub: "",
          sid: "",
          nbf: 0,
          exp: 0,
          iat: 0,
        },
        sessionId: clerkSession.id,
        session: clerkSession,
        actor: session.actor || undefined,
        userId: clerkSession.userId,
        user: session.user || undefined,
        orgId: session.orgId || undefined,
        orgRole: session.orgRole || undefined,
        orgSlug: session.orgSlug || undefined,
        organization: session.organization || undefined,
        getToken: session.getToken,
        debug: session.debug,
      };
      return createInnerTRPCContext({
        session: altSes,
      });
    } catch {
      return createInnerTRPCContext({
        session,
      });
    }
  }

  return createInnerTRPCContext({
    session,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  console.log(ctx.session);
  if (!ctx.session.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  if (
    !ctx.session.userId ||
    !(
      (await clerkClient.users.getUser(ctx.session.userId)).emailAddresses[0]
        ?.emailAddress === "shelbe_yousey@asl.org" ||
      (await clerkClient.users.getUser(ctx.session.userId)).emailAddresses[0]
        ?.emailAddress === "amari_victor@asl.org" ||
      (await clerkClient.users.getUser(ctx.session.userId)).emailAddresses[0]
        ?.emailAddress === "lauren_holladay@asl.org" ||
      (await clerkClient.users.getUser(ctx.session.userId)).emailAddresses[0]
        ?.emailAddress === "noah_sadrian@asl.org" ||
      (await clerkClient.users.getUser(ctx.session.userId)).emailAddresses[0]
        ?.emailAddress === "jaden_gardiola@asl.org"
    )
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedAdminProcedure = t.procedure.use(enforceUserIsAdmin);
