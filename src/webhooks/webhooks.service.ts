import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { DateTime } from 'luxon';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  async create({ title }: CreateWebhookDto, ownerId: string) {
    const uuid = uuidV4();

    const webhook = await this.prisma.webhook.create({
      data: {
        title,
        uuid,
        createdAt: DateTime.now().toJSDate(),
        ownerId,
      },
      select: {
        id: true,
        uuid: true,
        title: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return webhook;
  }

  findAll(ownerId: string) {
    return this.prisma.webhook.findMany({
      where: {
        ownerId,
      },
      select: {
        id: true,
        uuid: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, ownerId: string) {
    const webhook = await this.prisma.webhook.findFirst({
      where: {
        ownerId,
        id,
      },
      select: {
        id: true,
        uuid: true,
        title: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return {
      ...webhook,
      url: `https://api-production-qggemmggya-uk.a.run.app/e/${webhook.uuid}`,
      email: `${webhook.uuid}@test.mh4sh.dev`,
    };
  }

  async update(id: string, { title }: UpdateWebhookDto, ownerId: string) {
    const webhookAlreadyExist = await this.prisma.webhook.findFirst({
      where: {
        id,
        ownerId,
      },
      select: {
        id: true,
      },
    });

    if (!webhookAlreadyExist) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const webhook = await this.prisma.webhook.update({
      where: {
        id: webhookAlreadyExist.id,
      },
      data: {
        title,
      },
      select: {
        id: true,
        uuid: true,
        title: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return webhook;
  }

  async remove(id: string, ownerId: string) {
    const webhook = await this.prisma.webhook.findFirst({
      where: {
        id,
        ownerId,
      },
    });

    if (!webhook) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.prisma.event.deleteMany({
      where: {
        webhookId: webhook.id,
      },
    });

    await this.prisma.webhook.delete({
      where: {
        id: webhook.id,
      },
    });

    return;
  }

  findAllEvents(id: string, ownerId: string) {
    return this.prisma.event.findMany({
      where: {
        webhook: {
          id,
          ownerId,
        },
      },
      select: {
        id: true,
        createdAt: true,
        method: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findeOneEvents(id: string, eventId: string, ownerId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        webhook: {
          id,
          ownerId,
        },
      },
      select: {
        id: true,
        method: true,
        ip: true,
        path: true,
        headers: true,
        queries: true,
        body: true,
        createdAt: true,
        webhook: {
          select: {
            id: true,
            uuid: true,
            title: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return event;
  }

  async removeEvent(id: string, eventId: string, ownerId: string) {
    const webhook = await this.prisma.webhook.findFirst({
      where: {
        id,
        ownerId,
      },
    });

    if (!webhook) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return;
  }
}
