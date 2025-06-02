import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';
import { connect } from "http2";


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
      post_id: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
    const {round_name, hit_data, golfer_id, hole_id, post_id} = input
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
        postGroup: {
          connect: {
            id: post_id
          }
        }
      },
    });
  }),
  addImg: publicProcedure
  .input(
    z.object({
      img_key: z.string(),
      round_id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const {img_key, round_id} = input
    return await ctx.prisma.round.update({
      where: {
        round_id: round_id,
      },
      data: {
        attachedPhotoID: img_key,
      },
    });
  }),
});
