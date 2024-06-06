import {UserInterface} from '../../domain/interfaces/UserInterface';
import axios from 'axios';
import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {BACKEND_URI} from '@env';

class UserRepository implements UserInterface {
  async Authenticateduser(token: string) {
    const backend_url = BACKEND_URI;
    const response = await axios.post(`${backend_url}/auth/decode_token`, {
      token: token,
    });
    if (response.status === 200) {
      return new SuccessEntity(200, response.data);
    }
  }
}

export {UserRepository};
