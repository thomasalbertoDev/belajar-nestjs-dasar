import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super();
    console.log('Create prisma servie');
  }
  onModuleInit() {
    console.log('Connect prisma service');
    this.$connect();
  }
  onModuleDestroy() {
    console.log('Disconnect prisma service');
    this.$disconnect();
  }
}
