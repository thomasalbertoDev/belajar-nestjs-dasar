import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Agar bisa diakses oleh module lain
})
export class PrismaModule {}
