import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'Post User';
  }

  @Get('/sample')
  get(): string {
    return 'Sample User';
  }
}
