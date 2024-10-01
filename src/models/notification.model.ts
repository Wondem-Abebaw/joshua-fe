import { Employee } from "./employee.model";

export interface Notification {
  id?: string;
  method?: string;
  title: string | undefined;
  body: string | undefined;
  receiver?: string;
  type?: string;
  employmentType?: string;
  employmentStatus?: string;
  deviceType?: string;
  isCompany?: string;
  status?: string;
  isSeen?: true;
  accountReceiver?: Employee;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
