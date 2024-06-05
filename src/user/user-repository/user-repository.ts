import { Connection } from '../connection/connection';

export class UserRepository {
  connection: Connection;

  save() {
    console.log('User saved');
  }
}

export function createUserRepository(connection: Connection) {
  const userRepository = new UserRepository();
  userRepository.connection = connection;
  return userRepository;
}
