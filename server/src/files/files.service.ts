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

    async upload(file): Promise<string> {
        // Генерує унікальне імя для картинки. В кінці добавляє формат
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

    // Збереження картинок в локальну папку
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve(__dirname, "..", "static");

            //Якщо по такому шляху папки не існує, то ми її створюємо
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
