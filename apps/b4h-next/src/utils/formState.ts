export type FormState = {
  message: string;
  issues?: string[];
};

export const defaultFormState: FormState = { message: '' };
