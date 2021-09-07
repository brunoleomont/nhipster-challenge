/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProfessionalType } from './professional-type.entity';

/**
 * A Professional.
 */
@Entity('professional')
export class Professional extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ type: 'boolean', name: 'activated' })
    activated: boolean;

    @ManyToOne((type) => ProfessionalType)
    professionalType: ProfessionalType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
