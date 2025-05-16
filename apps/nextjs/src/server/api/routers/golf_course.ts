import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.golfCourse.findMany({
      
    });
  }),
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.golfCourse.findMany({
        where: {
          name: {
            contains: input.query?.split(",")[0] || "",
            mode: "insensitive",
          },
        },
        include: {
          holes: {}
        },
        take: 1,
      });
    }),
    getSpecificCourse: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const {name} = input
      return ctx.prisma.golfCourse.findFirst({
        where: {
          name: name,
        },
        include: {
          holes: {}
        },
      });
    }),
});
