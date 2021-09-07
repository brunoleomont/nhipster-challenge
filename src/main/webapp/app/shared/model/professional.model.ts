import { IProfessionalType } from 'app/shared/model/professional-type.model';

export interface IProfessional {
  id?: number;
  name?: string;
  phone?: string | null;
  email?: string | null;
  activated?: boolean;
  professionalType?: IProfessionalType;
}

export const defaultValue: Readonly<IProfessional> = {
  activated: false,
};
