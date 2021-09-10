import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProfessionalDTO } from '../service/dto/professional.dto';
import { ProfessionalMapper } from '../service/mapper/professional.mapper';
import { ProfessionalRepository } from '../repository/professional.repository';

const relationshipNames = [];
relationshipNames.push('professionalType');

@Injectable()
export class ProfessionalService {
    logger = new Logger('ProfessionalService');

    constructor(@InjectRepository(ProfessionalRepository) private professionalRepository: ProfessionalRepository) {}

    async findById(id: string): Promise<ProfessionalDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.professionalRepository.findOne(id, options);
        return ProfessionalMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ProfessionalDTO>): Promise<ProfessionalDTO | undefined> {
        const result = await this.professionalRepository.findOne(options);
        return ProfessionalMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProfessionalDTO>): Promise<[ProfessionalDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.professionalRepository.findAndCount(options);
        const professionalDTO: ProfessionalDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((professional) =>
                professionalDTO.push(ProfessionalMapper.fromEntityToDTO(professional)),
            );
            resultList[0] = professionalDTO;
        }
        return resultList;
    }

    async save(professionalDTO: ProfessionalDTO): Promise<ProfessionalDTO | undefined> {
        const entity = ProfessionalMapper.fromDTOtoEntity(professionalDTO);
        entity.createdDate = new Date;
        const result = await this.professionalRepository.save(entity);
        return ProfessionalMapper.fromEntityToDTO(result);
    }

    async update(professionalDTO: ProfessionalDTO): Promise<ProfessionalDTO | undefined> {
        const entity = ProfessionalMapper.fromDTOtoEntity(professionalDTO);
        entity.lastModifiedDate = new Date;
        const result = await this.professionalRepository.save(entity);
        return ProfessionalMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.professionalRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
