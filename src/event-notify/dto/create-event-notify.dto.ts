import { Request } from 'express';

export class CreateEventNotifyDto {
  uuid: string;
  body: any;
  query: any;
  headers: any;
  request: Request;
}
