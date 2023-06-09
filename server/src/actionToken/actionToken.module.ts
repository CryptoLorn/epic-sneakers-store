import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { ActionTokenService } from "./actionToken.service";
import { ActionToken } from "./actionToken.model";

@Module({
    controllers: [],
    providers: [ActionTokenService],
    imports: [
        SequelizeModule.forFeature([ActionToken])
    ],
    exports: []
})
export class ActionTokenModule {}
