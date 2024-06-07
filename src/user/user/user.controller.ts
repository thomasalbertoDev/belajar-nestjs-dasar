import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { RoleGuard } from 'src/role/role.guard';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {}

  @Get('/current')
  @UseGuards(new RoleGuard(['admin', 'operator']))
  current(@Auth() user: User): Record<string, any> {
    return {
      data: `Welcome ${user.first_name} ${user.last_name}`,
    };
  }

  @UsePipes(new ValidationPipe(loginUserRequestValidation)) // Global pipe validation
  @UseFilters(ValidationFilter)
  @Post('/login')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(TimeInterceptor)
  login(
    @Body() request: LoginUserRequest,
    @Query('name')
    name: string,
  ) {
    return {
      data: `Welcome ${name} & ${request.username}`,
    };
  }

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send();
    this.emailService.send();

    console.log(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Get('/save')
  async createUser(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          message: 'First name is required',
        },
        400,
      );
    }
    return this.userRepository.save(firstName, lastName);
  }

  @Get('/hello')
  // @UseFilters(ValidationFilter) // Filter validation hanya berlaku untuk route ini
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Belajar View NestJS',
      name: `Hello ${name}`,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Cookie is set');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'Post User';
  }

  @Get('/sample')
  get(): string {
    return 'Sample User';
  }
}
