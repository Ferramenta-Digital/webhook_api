import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Auth } from 'src/auth/auth.decorator';
import { User, UserEntity } from 'src/auth/user.decorator';

@Controller('webhooks')
@Auth()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto, @User() user: UserEntity) {
    return this.webhooksService.create(createWebhookDto, user.id);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.webhooksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserEntity) {
    return this.webhooksService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWebhookDto: UpdateWebhookDto,
    @User() user: UserEntity,
  ) {
    return this.webhooksService.update(id, updateWebhookDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.webhooksService.remove(id, user.id);
  }

  @Get(':id/events')
  findAllEvents(@Param('id') id: string, @User() user: UserEntity) {
    return this.webhooksService.findAllEvents(id, user.id);
  }

  @Get(':id/events/:eventId')
  findeOneEvents(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
    @User() user: UserEntity,
  ) {
    return this.webhooksService.findeOneEvents(id, eventId, user.id);
  }

  @Delete(':id/events/:eventId')
  removeEvent(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
    @User() user: UserEntity,
  ) {
    return this.webhooksService.removeEvent(id, eventId, user.id);
  }
}
