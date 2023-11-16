import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor() {}
}
