import {UserRepository} from '../../infrastructure/repositories/UserRepository';

class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async Authenticateduser(token: string) {
    return this.userRepository.Authenticateduser(token);
  }
}

export {UserService};
