import { Module } from '@nestjs/common';
import { EventNotifyService } from './event-notify.service';
import { EventNotifyController } from './event-notify.controller';

@Module({
  controllers: [EventNotifyController],
  providers: [EventNotifyService]
})
export class EventNotifyModule {}
