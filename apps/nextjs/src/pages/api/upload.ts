// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import formidable, { File } from 'formidable'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Tell Next.js not to parse body
export const config = {
  api: {
    bodyParser: false,
  },
}

const s3 = new AWS.S3({
  region: 'eu-north-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

// Promisify formidable
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ multiples: false })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { files } = await parseForm(req);
    const file = files.file as formidable.File;

    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'File missing' });
    }

    const fileStream = fs.createReadStream(file.filepath);
    const fileName = file.name ?? `upload-${uuidv4()}`;
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);
    const uniqueFileName = `${base}-${uuidv4()}${ext}`;

    const result = await s3.upload({
      Bucket: 'youseygolfbucket',
      Key: uniqueFileName,
      Body: fileStream,
      ContentType: file.mimetype || 'application/octet-stream',
    }).promise();

    return res.status(200).json({ url: result.Location });
  } catch (error: any) {
    console.error('Upload failed:', error);
    return res.status(500).json({ error: 'Upload failed', details: error.message });
  }
}
