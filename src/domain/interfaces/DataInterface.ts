import {SuccessEntity} from '../entities/AuthEntity';

export interface DataInterface {
  GeneralHealthMetrics(token: string): Promise<SuccessEntity | undefined>;
  GetAssessmeentMetrics(token: string): Promise<SuccessEntity | undefined>;
  GetRecommendations(token: string): Promise<SuccessEntity | undefined>;
  GetGeneralMetrics(token: string): Promise<SuccessEntity | undefined>;
  Search(token: string, query: string): Promise<SuccessEntity | undefined>;
}
