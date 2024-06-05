import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  send() {
    console.log('Mail sent');
  }
}

export const mailService = new MailService();
