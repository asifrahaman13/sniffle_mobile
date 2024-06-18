import {ExportRepository} from '../../infrastructure/repositories/ExportRepository';

class ExportService {
  private exportRepository: ExportRepository;

  constructor(exportRepository: ExportRepository) {
    this.exportRepository = exportRepository;
  }

  async ExportData(token: string, export_type: string) {
    return this.exportRepository.ExportData(token, export_type);
  }
}

export {ExportService};
