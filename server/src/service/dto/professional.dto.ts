/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProfessionalTypeDTO } from './professional-type.dto';

/**
 * A Professional DTO object.
 */
export class ProfessionalDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'activated field' })
    activated: boolean;

    @ApiModelProperty({ type: ProfessionalTypeDTO, description: 'professionalType relationship' })
    professionalType: ProfessionalTypeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
