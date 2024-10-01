import { User } from "./user.model";

export interface Activity {
  id: string;
  modelId: string;
  modelName: string;
  userId: string;
  action: string;
  ip: string;
  oldPayload: any;
  payload: any;
  user: User;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  deletedBy: string;
}
