import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventEmailNotifyDto } from './dto/create-event-email-notify.dto';
import { CreateEventNotifyDto } from './dto/create-event-notify.dto';

@Injectable()
export class EventNotifyService {
  constructor(private prisma: PrismaService) {}

  async createEmail({ uuid, body: bodyEmail }: CreateEventEmailNotifyDto) {
    const webhook = await this.prisma.webhook.findFirst({
      where: {
        uuid,
      },
    });

    if (!webhook) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const { headers, ...body } = bodyEmail;

    await this.prisma.event.create({
      data: {
        body,
        headers,
        queries: {},
        ip: '',
        method: 'MAIL',
        path: '',
        webhookId: webhook.id,
        createdAt: DateTime.now().toJSDate(),
      },
    });

    return 'This action adds a new eventNotify';
  }

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
