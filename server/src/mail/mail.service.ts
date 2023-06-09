import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

import { constant } from "../core/constants/constant";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(email: string, emailAction: string, activationLink: string): Promise<void> {
        try {
            let subject: string;
            let html: string;

            if (emailAction === constant.ACTIVATION_LINK) {
                subject = "Confirm email";
                html = "Hi! Thanks for your registration<br><br>" +
                    `<a href=${process.env.SERVER_URL}/users/activate/${activationLink}>Click here to confirm your email</a>`;
            } else {
                subject = "Restore your password";
                html = "To restore your password, follow the link below:<br><br>" +
                    `<a href=${process.env.CLIENT_URL}/password/forgot/${activationLink}>Click to restore</a>`;
            }

            await this.mailerService.sendMail({
                to: email,
                from: "Epic Sneakers Store",
                subject: subject,
                html: html
            })
        } catch (e) {
            console.log(e);
        }
    }
}
