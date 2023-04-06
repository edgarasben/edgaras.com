import AWS from 'aws-sdk'
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'

interface ExtendedNextApiRequest extends NextApiRequest {
    file: Express.Multer.File
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: 'ams3',
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID as string,
        secretAccessKey: process.env.DO_SPACES_SECRET as string
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse
) {
    // Use the `upload` middleware to process the file
    upload.single('file')(req as any, res as any, (err) => {
        if (err) {
            // Handle the error
            return res.status(500).send(err)
        }

        try {
            return s3Client.putObject(
                {
                    Bucket: process.env.DO_SPACES_BUCKET as string,
                    Key: req.file.originalname,
                    Body: req.file.buffer,
                    ACL: 'public-read'
                },
                async () => res.status(201).send('File uploaded')
            )
        } catch (error) {
            console.log(error)
            res.status(500).send('Error uploading file')
        }

        // Send a response to the client
        return res.status(201).send('File received')
    })
}
