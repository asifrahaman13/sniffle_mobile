import {SuccessEntity} from '../entities/AuthEntity';

export interface DataInterface {
  GeneralHealthMetrics(token: string): Promise<SuccessEntity | undefined>;
}
