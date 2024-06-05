import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Thomas');
    expect(response).toBe('Hello Thomas!'); // Remove the exclamation mark from the expected value
  });

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Thomas', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Belajar View NestJS',
      name: 'Hello Thomas',
    });
  });
});
