import { Injectable } from '@nestjs/common';
import { CreateEventNotifyDto } from './dto/create-event-notify.dto';
import { UpdateEventNotifyDto } from './dto/update-event-notify.dto';

@Injectable()
export class EventNotifyService {
  create(createEventNotifyDto: CreateEventNotifyDto) {
    return 'This action adds a new eventNotify';
  }
}
