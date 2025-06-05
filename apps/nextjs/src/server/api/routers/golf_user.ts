import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { TRPCError } from "@trpc/server";


export const golfUserRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.golfer.findMany({

    });
  }),
  createUser: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const {name, email, password} = input
    const hash = await bcrypt.hash(password, 10) as string;
    try {
    const newUser = await ctx.prisma.golfer.create({
      data: {
        name: name,
        email: email,
        password: hash
      }
    })

    return newUser.id + "\\" + newUser.name;
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Email or name is already taken',
      });
    }
  
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not create user.',
    });
  }
  }),
  verifyUser: publicProcedure.input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const { email, password } = input;
  
    const user = await ctx.prisma.golfer.findUnique({
      where: { email },
    });
  
    if (!user || !user.password) return {isValid: false, id: "", result: ""};
  
    const isValid = await bcrypt.compare(password, user.password) as boolean;
    return {isValid: isValid, id: user.id, result: user.id + "\\" + user.name};
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
  startFollowing: publicProcedure.input(
    z.object({
      userMyId: z.string(),
      userNewId: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const {userMyId, userNewId} = input
    return await ctx.prisma.golfer.update({
      where: {
        id: userMyId,
      },
      data: {
        following: {
          connect: { id: userNewId },
      }
      },
    })
  }),
  removeFollowing: publicProcedure.input(
    z.object({
      userMyId: z.string(),
      userNewId: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const {userMyId, userNewId} = input
    return await ctx.prisma.golfer.update({
      where: {
        id: userMyId,
      },
      data: {
        following: {
          disconnect: { id: userNewId },
      }
      },
    })
  }),
  updateImg: publicProcedure
  .input(
    z.object({
      img_key: z.string(),
      user_id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const {img_key, user_id} = input
    return await ctx.prisma.golfer.update({
      where: {
        id: user_id,
      },
      data: {
        profilePhotoID: img_key,
      },
    });
  }),


});
