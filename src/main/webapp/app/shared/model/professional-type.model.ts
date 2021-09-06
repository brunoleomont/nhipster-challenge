export interface IProfessionalType {
  id?: number;
  description?: string;
  activated?: boolean;
}

export const defaultValue: Readonly<IProfessionalType> = {
  activated: false,
};
