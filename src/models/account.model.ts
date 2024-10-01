export interface Account {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  type: string;
  isActive: boolean;
  gender: string;
  address: {
    country: string;
    city: string;
    subCity: string;
    woreda: string;
    houseNumber: string;
    specificLocation: string;
  };
  profileImage: {
    filename: string;
    path: string;
    originalname: string;
    mimetype: string;
    size: 0;
  };
  planTypeId: string;
  planTypeDuration: number;
  numberOfJobPosts: number;
  numberOfRequests: number;
  verified: boolean;
  notifyMe: boolean;
  isPaid: boolean;
  fcmId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  deletedBy: string;
}
