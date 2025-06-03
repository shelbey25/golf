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
    return await ctx.prisma.post.findMany({
        where: {
            golferId: {
              not: user_id, // Exclude the current user's ID
            },
        },
        include: {
          rounds: {
            include: {
              hole: {
                include: {
                  course: {}
                }
              }
            }
          },
          user: {}
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
  startNewPost: publicProcedure.input(
    z.object({
      user_id: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const {user_id } = input
    const post =  await ctx.prisma.post.create({
        data: {
            user: {
                connect: {
                    id: user_id
                }
            }
        }
    });
    return {id: post.id}

  }),
  updateFlic: publicProcedure
    .input(
      z.object({
        img_key: z.string(),
        post_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {img_key, post_id} = input
      return await ctx.prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          photo: img_key,
        },
      });
    }),
})