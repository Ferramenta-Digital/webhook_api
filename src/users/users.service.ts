import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import * as randomize from 'randomatic';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginConfirmUserDto } from './dto/login-confirm-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailService,
  ) {}

  async login({ email }: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    const code = randomize('0', 6);

    if (!user) {
      await this.prisma.user.create({
        data: {
          email,
          verify: {
            code,
            expireOn: DateTime.now().plus({ minutes: 30 }).toJSDate(),
          },
        },
      });
    } else {
      await this.prisma.user.update({
        data: {
          verify: {
            code,
            expireOn: DateTime.now().plus({ minutes: 30 }).toJSDate(),
          },
        },
        where: {
          email,
        },
      });
    }

    await this.mailerService.sendActivationCode({
      code,
      email,
    });

    return;
  }

  async loginConfirm({ email, code }: LoginConfirmUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (
      !user.verify ||
      user.verify?.code !== code ||
      DateTime.fromJSDate(user.verify?.expireOn).diff(DateTime.now())
        .milliseconds < 0
    ) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const data = {
      time: DateTime.now().toJSDate(),
      userId: user.id,
      userEmail: user.email,
    };

    await this.prisma.user.update({
      data: {
        verify: null,
      },
      where: {
        id: user.id,
      },
    });

    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);

    return { token };
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
