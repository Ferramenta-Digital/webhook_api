import { Controller, Body, All, Query, Headers } from '@nestjs/common';
import { EventNotifyService } from './event-notify.service';

@Controller('event-notify')
export class EventNotifyController {
  constructor(private readonly eventNotifyService: EventNotifyService) {}

  @All(':id')
  create(@Body() body: any, @Query() query: any, @Headers() headers: any) {
    console.log(body, query, headers);
    return this.eventNotifyService.create({} as any);
  }
}
