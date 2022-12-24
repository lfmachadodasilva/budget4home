import { Label } from "./label";

export interface Expense {
  id: string;
  name: string;
  value: number;
  date: string;
  label?: Label;
}