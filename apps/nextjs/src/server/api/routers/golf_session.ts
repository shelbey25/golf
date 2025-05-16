import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';


export const golfSessionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.round.findMany({
      
    });
  }),
  createRound: publicProcedure
  .input(
    z.object({
      round_name: z.string(),
      hit_data: z.string(),
      golfer_id: z.string(),
      hole_id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const {round_name, hit_data, golfer_id, hole_id} = input
    return await ctx.prisma.round.create({
      data: {
        round_name: round_name,
        hit_data: hit_data,
        golfer: {
          connect: {
            id: golfer_id, 
          },
        },
        hole: {
          connect: {
            hole_id: hole_id, 
          },
        },
      },
    });
  }),
});
