import { Address } from "./address.model";

interface DateTimeRange {
  day: string;
  time: { startTime: string; endTime: string };
}
export interface Employee {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: Date;
  gender?: string;
  deviceType?: string;
  address?: {
    country?: string;
    city?: string;
    subCity?: string;
    woreda?: string;
    houseNumber?: string;
    specificLocation?: string;
  };
  emergencyContact?: {
    phoneNumber?: string;
    name?: string;
  };
  religion?: string;
  languages?: [string];
  employmentType?: string;
  position?: string;
  givenServices?: string;
  educationLevel?: string;
  experience?: string;
  bio?: string;
  employmentStatus?: string;
  preferredSalaryType?: string;
  inSchool?: true;
  hasChildren?: true;
  isCertified?: true;
  enabled?: true;
  preferredSalary?: 0;
  preferredHourlyRate?: 0;
  preferredHours?: string;
  preferresLiveIn?: true;
  preferredDatetime?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  preferredAgeGroup?: [string];
  preferredGrade?: [string];
  preferredSubject?: [string];
  archiveReason?: string;
  profileImage?: any;
  minioProfileImage?: string;

  identification?: any;
  minioIdentification?: string;
  license?: any;
  minioLicense?: string;
  documents?: any;
  minioDocuments?: string;
  minioLicenseMimeType?: string;
  minioDocumentsMimeType?: string;
  minioIdentificationMimeType?: string;
  minioResumeMimeType?: string;
  minioCoverLetterMimeType?: string;
  coverLetter?: any;
  resume?: any;
  minioResume?: string;
  minioCoverLetter?: string;
  takenExams?: string[];
  hasPassed?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
interface ProfileImage {
  filename?: string;
  mimetype?: string;
  originalname?: string;
  path?: string;
  size?: number;
}
