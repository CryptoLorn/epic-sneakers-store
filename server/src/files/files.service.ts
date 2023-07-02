import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extname } from "node:path";

@Injectable()
export class FilesService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })

    async upload(file: Express.Multer.File): Promise<string> {
        // Generates unique name for image. Adds format at the end
        const filePath = `poster/${uuid.v4()}${extname(file.originalname)}`;

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_NAME,
                Key: filePath,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: process.env.AWS_S3_ACL
            })
        )

        return filePath;
    }

    async deleteFile(filePath: string): Promise<void> {
        await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_NAME,
                Key: filePath
            })
        )
    }

    // Save image in local folder
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve(__dirname, "..", "static");

            // If path not found, then we create folder
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            throw new HttpException("Failed to write file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
