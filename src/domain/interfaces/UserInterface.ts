import {SuccessEntity} from '../entities/AuthEntity';

export interface UserInterface {
  Authenticateduser(token: string): Promise<SuccessEntity | undefined>;
}
