import { Employee } from "./employee.model";
import { Employer } from "./employer.model";
import { Job } from "./job.model";
import { Request } from "./request.model";

export interface HiredEmployee {
  id?: string;
  employeeId?: string;
  employerId?: string;
  jobId?: string;
  requestId: string;
  resignationReason?: string;
  status?: string;
  hiredEmployee?: Employee;
  employer?: Employer;
  job?: Job;
  request?: Request;
  hasPaidCommission?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
