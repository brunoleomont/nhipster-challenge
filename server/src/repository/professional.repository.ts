import { EntityRepository, Repository } from 'typeorm';
import { Professional } from '../domain/professional.entity';

@EntityRepository(Professional)
export class ProfessionalRepository extends Repository<Professional> {}
