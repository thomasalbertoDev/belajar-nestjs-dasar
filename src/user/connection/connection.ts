import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class Connection {
  getName(): string {
    return null;
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MySQL';
  }
}

@Injectable()
export class PostgreSQLConnection extends Connection {
  getName(): string {
    return 'PostgreSQL';
  }
}

export function createConnection(configService: ConfigService): Connection {
  if (configService.get<string>('DATABASE') === 'mysql') {
    return new MySQLConnection();
  } else {
    return new PostgreSQLConnection();
  }
}
