import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
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
