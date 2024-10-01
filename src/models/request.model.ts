import { Employee } from "./employee.model";
import { Employer } from "./employer.model";

export interface Request {
  id?: string;
  name?: string;
  employerId?: string;
  employeeId?: string;
  status?: string;
  archiveReason?: string;
  employee?: Employee;
  employer?: Employer;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
