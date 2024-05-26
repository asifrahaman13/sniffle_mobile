import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import axios from 'axios';

class DataRepository implements DataInterface {
  async GeneralHealthMetrics(token: string) {
    const backend_url = process.env.BACKEND_URI;

    const response = await axios.get(
      `${backend_url}/data/general_metrics/${token}`,
    );

    if (response.status === 200) {
      return new SuccessEntity(200, response.data.data);
    }
  }
}

export {DataRepository};
