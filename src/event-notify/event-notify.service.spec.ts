import { Test, TestingModule } from '@nestjs/testing';
import { EventNotifyService } from './event-notify.service';

describe('EventNotifyService', () => {
  let service: EventNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventNotifyService],
    }).compile();

    service = module.get<EventNotifyService>(EventNotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
