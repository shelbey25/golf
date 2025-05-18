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
});
