import {UserInterface} from '../../domain/interfaces/UserInterface';
import axios from 'axios';
import {SuccessEntity} from '../../domain/entities/AuthEntity';

class UserRepository implements UserInterface {
  async Authenticateduser(token: string) {
    const backend_url = process.env.BACKEND_URI;

    console.log('The bakend uri is: ', backend_url);

    const response = await axios.post(`${backend_url}/auth/decode_token`, {
      token: token,
    });

    console.log('Thre usual reswpohse', response.data);

    if (response.status === 200) {
      return new SuccessEntity(200, response.data);
    }
  }
}

export {UserRepository};
