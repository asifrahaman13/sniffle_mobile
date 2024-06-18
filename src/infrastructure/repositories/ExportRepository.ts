import axios from 'axios';
import {SuccessEntity} from '../../domain/entities/AuthEntity';
import {BACKEND_URI} from '../../config/config';
import {ExportInterface} from '../../domain/interfaces/ExportInterface';

class ExportRepository implements ExportInterface {
  private backend_url = BACKEND_URI;
  async ExportData(token: string, export_type: string) {
    try {
      const response = await axios.post(
        `${this.backend_url}/data/export-data`,
        {
          export_type: export_type,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return new SuccessEntity(response.status, response.data);
    } catch (err) {
      console.log('error', err);
      return new SuccessEntity(400, 'error');
    }
  }
}

export {ExportRepository};
