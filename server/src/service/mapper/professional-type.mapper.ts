import { ProfessionalType } from '../../domain/professional-type.entity';
import { ProfessionalTypeDTO } from '../dto/professional-type.dto';

/**
 * A ProfessionalType mapper object.
 */
export class ProfessionalTypeMapper {
    static fromDTOtoEntity(entityDTO: ProfessionalTypeDTO): ProfessionalType {
        if (!entityDTO) {
            return;
        }
        let entity = new ProfessionalType();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProfessionalType): ProfessionalTypeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProfessionalTypeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
