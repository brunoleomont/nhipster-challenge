import { IProfessionalType } from 'app/shared/model/professional-type.model';

export interface IProfessional {
  id?: number;
  name?: string;
  phone?: string | null;
  email?: string | null;
  activated?: boolean;
  professionalType?: IProfessionalType;
  createdDate?: Date;
  lastModifiedDate?: Date;
}

export const defaultValue: Readonly<IProfessional> = {
  activated: false,
};
