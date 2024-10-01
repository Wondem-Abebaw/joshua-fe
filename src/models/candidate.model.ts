import { Employee } from "./employee.model";
import { Employer } from "./employer.model";
import { Job } from "./job.model";

export interface Candidate {
  id?: string;
  jobId?: string;
  employeeId?: string;
  status?: string;
  employee?: Employee;
  job?: Job;
  answers?: {
    id?: string;
    questionId?: string;
    employeeId?: string;
    answer?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    archivedAt?: string;
    deletedAt?: string;
    deletedBy?: string;
  }[];
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
