import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventNotifyDto } from './dto/create-event-notify.dto';

@Injectable()
export class EventNotifyService {
  constructor(private prisma: PrismaService) {}

  async create({ uuid, body, query, headers, request }: CreateEventNotifyDto) {
    const webhook = await this.prisma.webhook.findFirst({
      where: {
        uuid,
      },
    });

    if (!webhook) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.event.create({
      data: {
        body,
        headers,
        queries: query,
        ip: '',
        method: request.method,
        path: request.path,
        webhookId: webhook.id,
        createdAt: DateTime.now().toJSDate(),
      },
    });
    return 'This action adds a new eventNotify';
  }
}
