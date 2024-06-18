import {UserInterface} from '../../domain/interfaces/UserInterface';
import axios from 'axios';
import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {BACKEND_URI} from '../../config/config';

class UserRepository implements UserInterface {
  private backend_url = BACKEND_URI;
  async Authenticateduser(token: string) {
    const response = await axios.post(`${this.backend_url}/auth/decode_token`, {
      token: token,
    });
    if (response.status === 200) {
      return new SuccessEntity(200, response.data);
    }
  }
}

export {UserRepository};
