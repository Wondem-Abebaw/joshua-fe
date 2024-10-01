import { Employee } from "./employee.model";
import { Employer } from "./employer.model";

export interface HiredCandidate {
  id?: string;
  employeeId?: string;
  employerId?: string;
  jobId?: string;
  requestId?: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
  employee?: Employee;
}
