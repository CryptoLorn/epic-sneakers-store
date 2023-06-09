import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { ActionToken } from "./actionToken.model";
import { ActionTokenDto } from "./dto/actionToken.dto";

@Injectable()
export class ActionTokenService {
    constructor(@InjectModel(ActionToken)
                private actionTokenRepository: typeof ActionToken) {
    }

    async saveActionTokenToDB(dataToInsert: ActionTokenDto) {
        return await this.actionTokenRepository.create(dataToInsert);
    }

    async getOneByParams(token: string, tokenType: string) {
        return await this.actionTokenRepository.findOne({where: {token, token_type: tokenType}});
    }

    async deleteOne(token: string): Promise<number> {
        return await this.actionTokenRepository.destroy({where: {token}});
    }
}
