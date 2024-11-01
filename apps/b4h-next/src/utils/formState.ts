export type FormState = {
  message: string;
  issues?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any | null;
};

export const defaultFormState: FormState = { message: '', data: undefined };
