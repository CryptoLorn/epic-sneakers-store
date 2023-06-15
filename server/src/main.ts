import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();