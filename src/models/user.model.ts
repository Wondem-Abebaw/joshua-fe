import { Address } from "./address.model";

export interface User {
  id?: string;
  name: string;
  phoneNumber: string;
  email: string;
  companyName?: string;
  role?: {
    id?: string;
    name?: string;
    key?: string;
  };
  address?: Address;
  profileImage?: ProfileImage;
  gender: string;
  enabled?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
  archiveReason?: string;
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
