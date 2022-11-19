import { Module } from '@nestjs/common';
import { EventNotifyService } from './event-notify.service';
import { EventNotifyController } from './event-notify.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventNotifyController],
  providers: [EventNotifyService, PrismaService],
})
export class EventNotifyModule {}
