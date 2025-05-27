import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { PrismaClient } from '@prisma/client';

AWS.config.update(
    {
        region: "eu-north-1",
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
)

const s3 = new AWS.S3()



export const imageRouter = createTRPCRouter({

    uploadImg: publicProcedure.input(
        z.object({
            bucketName: z.string(),
            fileName: z.string(),
            fileData: z.string(),
        })
      ).mutation(({ ctx, input }) => {
        
        const {bucketName, fileName, fileData} = input;

         const ext = path.extname(fileName)
        const base = path.basename(fileName, ext)
        const uniqueFileName = `${base}-${uuidv4()}${ext}`

        const base64Data = fileData.split(',')[1] || fileData
        const buffer = Buffer.from(base64Data, 'base64')

        const params = {
            Bucket: bucketName,
            Key: uniqueFileName,
            Body: buffer,
        }
        return s3.upload(params).promise()

      }),

})
