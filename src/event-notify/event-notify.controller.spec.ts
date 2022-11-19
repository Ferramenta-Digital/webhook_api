import { Test, TestingModule } from '@nestjs/testing';
import { EventNotifyController } from './event-notify.controller';
import { EventNotifyService } from './event-notify.service';

describe('EventNotifyController', () => {
  let controller: EventNotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventNotifyController],
      providers: [EventNotifyService],
    }).compile();

    controller = module.get<EventNotifyController>(EventNotifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
