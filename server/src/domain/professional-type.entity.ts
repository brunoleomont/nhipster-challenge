/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A ProfessionalType.
 */
@Entity('professional_type')
export class ProfessionalType extends BaseEntity {
    @Column({ name: 'description' })
    description: string;

    @Column({ type: 'boolean', name: 'activated' })
    activated: boolean;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
