export interface IProfessional {
  id?: number;
  name?: string;
  phone?: string | null;
  email?: string | null;
  activated?: boolean;
}

export const defaultValue: Readonly<IProfessional> = {
  activated: false,
};
