import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable() // Agar bisa diinject atau diakses oleh module lain
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.log('Create user repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}
