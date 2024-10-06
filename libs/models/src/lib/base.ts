export interface BaseModel {
  id: string;
  name: string;

  createdBy: string;
  createdAt: Date;

  updatedBy: string;
  updatedAt: Date;
}
