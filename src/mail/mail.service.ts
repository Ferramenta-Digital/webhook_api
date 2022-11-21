import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendActivationCodeEmailDto } from './dto/send-activation-code-mail';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendActivationCode({ email, code }: SendActivationCodeEmailDto) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Login code WebHoo',
        text: `Your login code into WebHoo is ${code}.`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
