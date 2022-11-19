import { PartialType } from '@nestjs/mapped-types';
import { CreateEventNotifyDto } from './create-event-notify.dto';

export class UpdateEventNotifyDto extends PartialType(CreateEventNotifyDto) {}
