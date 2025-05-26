import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';


export const golfUserRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.golfer.findMany({

    });
  }),
  getMyInfo: publicProcedure.input(
    z.object({
      my_id: z.string(),
    })
  ).query(({ ctx, input }) => {
    const {my_id} = input
    return ctx.prisma.golfer.findFirst({
      where: {
        id: my_id,
      },
      include: {
        following: {
          
        },
        followers: {
          
        },
      }
    });
  }),
  getAllCompetitors: publicProcedure.input(
    z.object({
      my_id: z.string(),
      hole_id: z.string()
    })
  ).query(({ ctx, input }) => {
    const {my_id, hole_id} = input
    return ctx.prisma.golfer.findMany({
      where: {
        id: my_id,
      },
      include: {
        following: {
          include: {
            rounds: {
              where: {
                holeId: hole_id
              }
            }
          }
        },
        rounds: {
          where: {
            holeId: hole_id
          }
        }
      }
    });
  }),
  getSimilarUsers: publicProcedure
  .input(z.object({
    currentUserId: z.string(),
    search: z.string().optional(),
  }))
  .query(async ({ ctx, input }) => {
    const { currentUserId, search } = input;

    // Get users the current user follows
    const userWithFollows = await ctx.prisma.golfer.findUnique({
      where: { id: currentUserId },
      include: { following: { include: { following: {} } } }, // 2-level follow
    });

    if (!userWithFollows) return [];

    const secondDegreeFollows = userWithFollows.following
      .flatMap(f => f.following)
      .filter(u => u.id !== currentUserId); 

    const uniqueUsers = Array.from(new Map(
      secondDegreeFollows.map(user => [user.id, user])
    ).values());

    // If we have 10 or more similar users, return top 10
    if (uniqueUsers.length >= 9) {
      return uniqueUsers.slice(0, 10);
    }

    // Else, supplement with random users based on search
    const extraUsers = await ctx.prisma.golfer.findMany({
      where: {
        id: { not: currentUserId },
        name: { contains: search ?? "", mode: "insensitive" },
      },
      take: 9,
    });

    // Combine and return
    const combined = [
      ...uniqueUsers,
      ...extraUsers.filter(extra => !uniqueUsers.find(u => u.id === extra.id))
    ];
 
    return combined.slice(0, 9);
  }),
  getMyInfoPreview: publicProcedure.input(
    z.object({
      my_id: z.string(),
    })
  ).query(({ ctx, input }) => {
    const {my_id} = input
    return ctx.prisma.golfer.findFirst({
      where: {
        id: my_id,
      },
      include: {
        following: {
          
        },
        followers: {
          
        },
        rounds: {
          include: {
            hole: {
              include: {
                course: {}
              }
            }
          }
        }
      }
    });
  }),

});
