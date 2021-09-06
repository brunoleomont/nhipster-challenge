import { EntityRepository, Repository } from 'typeorm';
import { ProfessionalType } from '../domain/professional-type.entity';

@EntityRepository(ProfessionalType)
export class ProfessionalTypeRepository extends Repository<ProfessionalType> {}
