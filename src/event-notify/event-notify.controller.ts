import {
  Controller,
  Body,
  All,
  Query,
  Headers,
  Req,
  Param,
} from '@nestjs/common';
import { Request } from 'express';

import { EventNotifyService } from './event-notify.service';

@Controller('e')
export class EventNotifyController {
  constructor(private readonly eventNotifyService: EventNotifyService) {}

  @All('/email/:uuid')
  createEmail(@Param('uuid') uuid: string, @Body() body: any) {
    return this.eventNotifyService.createEmail({
      uuid,
      body,
    });
  }

  @All(':uuid')
  create(
    @Param('uuid') uuid: string,
    @Body() body: any,
    @Query() query: any,
    @Headers() headers: any,
    @Req() request: Request,
  ) {
    return this.eventNotifyService.create({
      uuid,
      body,
      query,
      headers,
      request,
    });
  }
}
