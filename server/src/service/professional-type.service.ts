import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProfessionalTypeDTO } from '../service/dto/professional-type.dto';
import { ProfessionalTypeMapper } from '../service/mapper/professional-type.mapper';
import { ProfessionalTypeRepository } from '../repository/professional-type.repository';

const relationshipNames = [];

@Injectable()
export class ProfessionalTypeService {
    logger = new Logger('ProfessionalTypeService');

    constructor(
        @InjectRepository(ProfessionalTypeRepository) private professionalTypeRepository: ProfessionalTypeRepository,
    ) {}

    async findById(id: string): Promise<ProfessionalTypeDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.professionalTypeRepository.findOne(id, options);
        return ProfessionalTypeMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ProfessionalTypeDTO>): Promise<ProfessionalTypeDTO | undefined> {
        const result = await this.professionalTypeRepository.findOne(options);
        return ProfessionalTypeMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProfessionalTypeDTO>): Promise<[ProfessionalTypeDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.professionalTypeRepository.findAndCount(options);
        const professionalTypeDTO: ProfessionalTypeDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((professionalType) =>
                professionalTypeDTO.push(ProfessionalTypeMapper.fromEntityToDTO(professionalType)),
            );
            resultList[0] = professionalTypeDTO;
        }
        return resultList;
    }

    async save(professionalTypeDTO: ProfessionalTypeDTO): Promise<ProfessionalTypeDTO | undefined> {
        const entity = ProfessionalTypeMapper.fromDTOtoEntity(professionalTypeDTO);
        const result = await this.professionalTypeRepository.save(entity);
        return ProfessionalTypeMapper.fromEntityToDTO(result);
    }

    async update(professionalTypeDTO: ProfessionalTypeDTO): Promise<ProfessionalTypeDTO | undefined> {
        const entity = ProfessionalTypeMapper.fromDTOtoEntity(professionalTypeDTO);
        const result = await this.professionalTypeRepository.save(entity);
        return ProfessionalTypeMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.professionalTypeRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
