import { MailerModule } from '@nestjs-modules/mailer';

import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"WeebHoo" <${process.env.MAIL_FROM}>`,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
