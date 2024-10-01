export interface Configuration {
  id: string;
  globalConfigurations: {
    timeout: number;
    employeeRegistrationFee: number;
    employeePlanDuration: number;
    employerRegistrationFeeOne: number;
    employerRegistrationFeeSix: number;
    employerRegistrationFeeThree: number;
    employerRegistrationFeeTwelve: number;
    freeJobPost: number;
    recentVersion?: string;
    isBeingMaintained: boolean;
    telebirrStatus: boolean;
    chapaStatus: boolean;
    isLive?: boolean;
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
  archiveReason?: string;
}
