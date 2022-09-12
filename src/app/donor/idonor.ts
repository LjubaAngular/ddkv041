export interface IDonor {
    id: number;
    employeeNumber: number;
    name: string;
    gender: string;
    identificationNumber: string;
    birthDate: Date;
    bloodType: string;
    rhFactor: string;
    lastDonationDate: Date;
    totalDonationNumber: number;
    member:	boolean;
    activity: boolean;
    note: string;
    status:	string;
    phone:	string;
}

