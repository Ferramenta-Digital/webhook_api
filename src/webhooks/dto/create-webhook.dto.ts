import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
  @ApiProperty()
  title: string;
}
