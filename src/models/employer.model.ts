import { Address } from "./address.model";
import { Job } from "./job.model";

export interface Employer {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  status?: string;
  companyName?: string;
  address?: Address;
  jobs?: Job[];
  gender?: string;
  isCompany?: boolean;
  deviceType?: string;
  archiveReason?: string;
  profileImage?: any;
  identification?: any;
  minioIdentification?: string;
  license?: any;
  minioLicense?: string;
  minioLicenseMimeType?: string;

  minioIdentificationMimeType?: string;
  preferredAge?: string;
  preferredLocation?: string;
  preferredSalary?: 0;
  servicesNeeded?: string[];
  numberOfJobPosts?: number;
  about?: string;
  enabled?: boolean;

  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;

  birthDate?: string;
  title?: string;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
  };
}
interface ProfileImage {
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}
