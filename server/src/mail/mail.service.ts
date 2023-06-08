import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(email: string, activationLink: string): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: "Epic Sneakers Store",
                subject: "Confirm email",
                html:
                "Hi! Thanks for your registration<br><br>" +
                    `<a href=${process.env.SERVER_URL}/users/activate/${activationLink}>Click here to confirm your email</a>`
            })
        } catch (e) {
            console.log(e);
        }
    }
}
