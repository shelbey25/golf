import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';


export const golf_rounds = createTRPCRouter({
//discover
getAllPosts: publicProcedure.input(
    z.object({
      user_id: z.string(),
      lastPostId: z.string()
    })
  ).query(async ({ ctx, input }) => {
    const {user_id, lastPostId} = input
    return await ctx.prisma.round.findMany({
        where: {
            golferId: {
              not: user_id, // Exclude the current user's ID
            },
        },
        take: 10,
        ...(lastPostId
            ? {
                skip: 1,
                cursor: { round_id: lastPostId },
              }
            : {}),
  orderBy: {
    date: 'desc',
  },
    })

  }),
})