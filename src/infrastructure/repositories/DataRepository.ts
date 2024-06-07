import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import axios from 'axios';
import {BACKEND_URI} from '../../config/config';

class DataRepository implements DataInterface {
  private backend_url = BACKEND_URI;
  async GeneralHealthMetrics(token: string) {
    try {
      const response = await axios.get(
        `${this.backend_url}/data/quantitative_metrics/${token}`,
      );
      return new SuccessEntity(response.status, response.data.data);
    } catch (err) {
      console.log('error', err);
      return new SuccessEntity(400, 'error');
    }
  }

  async GetAssessmeentMetrics(token: string) {
    try {
      const response = await axios.get(
        `${this.backend_url}/data/assessment_metrics/${token}`,
      );

      if (response.status === 200) {
        return new SuccessEntity(200, response.data.data);
      }
    } catch (err) {
      console.log('error', err);
      return new SuccessEntity(400, 'error');
    }
  }

  async GetRecommendations(token: string) {
    try {
      const response = await axios.get(
        `${this.backend_url}/data/recommendations/${token}`,
      );

      if (response.status === 200) {
        console.log(response.data.recommendations);
        return new SuccessEntity(200, response.data.recommendations);
      }
    } catch (err) {
      console.log('error', err);
      return new SuccessEntity(400, 'error');
    }
  }

  async GetGeneralMetrics(token: string) {
    try {
      const response = await axios.get(
        `${this.backend_url}/data/general_metrics/${token}`,
      );
      console.log(response);

      if (response.status === 200) {
        console.log(response.data.general_metrics);
        return new SuccessEntity(200, response.data);
      }
    } catch (err) {
      console.log('error', err);
      return new SuccessEntity(400, 'error');
    }
  }
}

export {DataRepository};
