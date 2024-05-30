import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import axios from 'axios';

class DataRepository implements DataInterface {
  async GeneralHealthMetrics(token: string) {
    const backend_url = process.env.BACKEND_URI;

    const response = await axios.get(
      `${backend_url}/data/quantitative_metrics/${token}`,
    );

    if (response.status === 200) {
      return new SuccessEntity(200, response.data.data);
    }
  }

  async GetAssessmeentMetrics(token: string) {
    const backend_url = process.env.BACKEND_URI;

    const response = await axios.get(
      `${backend_url}/data/assessment_metrics/${token}`,
    );

    if (response.status === 200) {
      return new SuccessEntity(200, response.data.data);
    }
  }

  async GetRecommendations(token: string) {
    const backend_url = process.env.BACKEND_URI;

    const response = await axios.get(
      `${backend_url}/data/recommendations/${token}`,
    );

    if (response.status === 200) {
      console.log(response.data.recommendations);
      return new SuccessEntity(200, response.data.recommendations);
    }
  }
}

export {DataRepository};
