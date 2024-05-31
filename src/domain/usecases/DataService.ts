import {DataRepository} from '../../infrastructure/repositories/DataRepository';

class DataService {
  private dataRepository: DataRepository;
  constructor(dataRepository: DataRepository) {
    this.dataRepository = dataRepository;
  }

  async GeneralHealthMetrics(token: string) {
    return this.dataRepository.GeneralHealthMetrics(token);
  }

  async GetAssessmeentMetrics(token: string) {
    return this.dataRepository.GetAssessmeentMetrics(token);
  }

  async GetRecommendations(token: string) {
    return this.dataRepository.GetRecommendations(token);
  }

  async GetGeneralMetrics(token: string) {
    return this.dataRepository.GetGeneralMetrics(token);
  }
}

export {DataService};
