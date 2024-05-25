import {SuccessEntity, TokenEntity} from '../entities/AuthEntity';

export interface AuthInterface {
  signup(
    email: string,
    username: string,
    password: string,
  ): Promise<SuccessEntity | undefined>;
  login(username: string, password: string): Promise<TokenEntity | undefined>;
}
