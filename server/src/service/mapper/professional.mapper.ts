import { Professional } from '../../domain/professional.entity';
import { ProfessionalDTO } from '../dto/professional.dto';

/**
 * A Professional mapper object.
 */
export class ProfessionalMapper {
    static fromDTOtoEntity(entityDTO: ProfessionalDTO): Professional {
        if (!entityDTO) {
            return;
        }
        let entity = new Professional();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Professional): ProfessionalDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProfessionalDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
