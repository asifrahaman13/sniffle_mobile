import {AuthInterface} from '../../domain/interfaces/AuthInterface';
import {SuccessEntity, TokenEntity} from '../../domain/entities/AuthEntity';
import axios from 'axios';

class AuthRepository implements AuthInterface {
  async signup(email: string, username: string, password: string) {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await axios.post(`${backend_url}/auth/signup`, {
      email,
      username,
      password,
    });

    console.log(response);

    if (response.status === 200) {
      return new SuccessEntity(200, response.data.data);
    }
  }

  async login(username: string, password: string) {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await axios.post(`${backend_url}/auth/login`, {
      username,
      password,
    });

    console.log(response);

    if (response.status === 200) {
      return new TokenEntity(200, response.data.data.token);
    }
  }

  async hr_signup(email: string, username: string, password: string) {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await axios.post(`${backend_url}/auth/hr_signup`, {
      email,
      username,
      password,
    });

    console.log(response);

    if (response.status === 200) {
      return new SuccessEntity(200, response.data.data);
    }
  }

  async hr_login(username: string, password: string) {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await axios.post(`${backend_url}/auth/hr_login`, {
      username,
      password,
    });

    console.log(response);

    if (response.status === 200) {
      return new TokenEntity(200, response.data.data.token);
    }
  }
}

export {AuthRepository};
