import { NextApiRequest, NextApiResponse } from 'next';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { filename, contentType } = req.body;

  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });

  const { url, fields } = await createPresignedPost(client, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${Date.now()}-${filename}`,
    Conditions: [
      ['content-length-range', 0, 10485760], // 10MB max
      ['starts-with', '$Content-Type', contentType],
    ],
    Fields: {
      'Content-Type': contentType,
    },
  });

  res.status(200).json({ url, fields });
}