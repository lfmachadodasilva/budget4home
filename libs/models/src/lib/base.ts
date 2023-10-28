export interface BaseModel {
  id: string;
  name: string;

  createdBy: string;
  updateBy: string;

  createdAt: Date;
  updatedAt: Date;
}
