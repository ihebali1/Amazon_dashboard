

export interface Transporter{
    id?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    driveLicence?: string;
    greyCards?: string[];
    driveLicenceExpiry: Date;
    createdAt?: Date;
    updateAt?: Date;
    phone: number;
    email: string;
}
