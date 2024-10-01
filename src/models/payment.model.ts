export interface Payment {
  id?: string;
  customerId?: string;
  amount?: number;
  isPaid?: true;
  status?: string;
  paidAt?: Date;
  expiresAt?: Date;
  depositedBy?: {
    id?: string;
    name?: string;
    type?: string;
    email?: string;
    phoneNumber?: string;
  };
  tradeDate?: Date;
  tradeNumber?: string;
  transactionNumber?: string;
  method?: string;
  reason?: string;
  planTypeId?: string;
  planTypeDuration?: number;
  archiveReason?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
