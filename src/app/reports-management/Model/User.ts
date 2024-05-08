import {Message} from "./Message";
import {Report} from "./report";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: any;
    dateBirth?: Date;
    isEmailVerfied: boolean;
    stripeId: string;
    files: File[] | string[];
    reports: Report[] | string[];
    messages: Message[] | string[];
    createdAt: Date;
    updatedAt: Date;
    role: string;
}