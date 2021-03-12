export enum ExpenseType {
  Incoming = 0,
  Outcoming = 1
}
export interface ExpenseModel {
  id: number;
  type: ExpenseType;
  name: string;
  value: number;
  date: Date;
  comments: string;
  scheduleBy: number;
  scheduleTotal: number;

  /** relations */
  labelId: number;
  labelName: string;
}
