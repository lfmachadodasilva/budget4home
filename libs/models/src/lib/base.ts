export interface BaseModel {
  id: string;
  name: string;

  createdBy?: string;
  updatedBy?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
