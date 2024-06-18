import {SuccessEntity} from '../entities/AuthEntity';

export interface ExportInterface {
  ExportData(
    token: string,
    export_type: string,
  ): Promise<SuccessEntity | undefined>;
}
