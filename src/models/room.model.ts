export interface Room {
  id?: string;
  name?: string;
  price?: string;
  amenities?: string[];
  description?: string;

  enabled?: true;
  roomImage?: any;
  archiveReason?: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
