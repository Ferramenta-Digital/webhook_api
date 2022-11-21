import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EventNotifyModule } from './event-notify/event-notify.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UsersModule, WebhooksModule, EventNotifyModule, MailModule],
})
export class AppModule {}
