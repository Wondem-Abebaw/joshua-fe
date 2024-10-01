import { JobSourceTypes } from "../shared/constants/enum/jobSourceType.enum";
import { Employee } from "./employee.model";
import { Employer } from "./employer.model";

export interface Job {
  id?: string;
  employerId?: string;
  source?: JobSourceTypes;
  title?: string;
  description?: string;
  category?: string;
  type?: string;
  city?: string;
  location?: string;
  experienceLevel?: string;
  applicantsNeeded?: number;
  maximumApplicants?: number;
  featured?: boolean;
  salary?: string;
  salaryType?: string;
  deadline?: Date;
  questions?: any[];
  status?: string;
  employer?: Employer;
  candidates?: {
    id?: string;
    jobId?: string;
    employeeId?: string;
    status?: string;
    employee?: Employee;
  }[];
  hiredCandidates?: {
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
  }[];
  archiveReason?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
