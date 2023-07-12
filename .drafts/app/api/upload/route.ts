import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!
  }
})

export async function POST(req: Request) {
  try {
    const { file } = await req.json()

    const presignedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: `${process.env.CLOUDFLARE_BUCKET_NAME}`,
        Key: file
      }),
      { expiresIn: 3600 }
    )

    return NextResponse.json({ presignedUrl })
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 })
  }
}
