import { Academy } from './Academy';

export interface AcademyRepository {
  get(): Promise<Academy[]>;
}
