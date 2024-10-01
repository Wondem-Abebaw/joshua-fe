export interface PaymentPlan {
  id?: string;
  name?: string;
  description?: string;
  oneMonthsPrice?: number;
  threeMonthsPrice?: number;
  sixMonthsPrice?: number;
  twelveMonthsPrice?: number;
  numberOfEmployees?: number;
  numberOfJobPosts?: number;
  enabled?: true;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
  archiveReason?: string;
}
