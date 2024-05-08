import {UserP} from "./UserP";

export interface Payout {
    id: string;
    amount: number;
    bankName: string;
    accountNumber: string;
    ibanNumber: string;
    rejectMessage: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: UserP;

}