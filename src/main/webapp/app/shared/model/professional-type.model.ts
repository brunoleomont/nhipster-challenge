export interface IProfessionalType {
  id?: number;
  description?: string;
  activated?: boolean;
  createdDate?: Date;
  lastModifiedDate?: Date;
}

export const defaultValue: Readonly<IProfessionalType> = {
  activated: false,
};
