import { ApiProperty } from '@nestjs/swagger';

export class LoginConfirmUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;
}
