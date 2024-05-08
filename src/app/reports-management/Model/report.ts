
import {Admin} from '../../admin-management/Models/admin';
import {Message} from "./Message";
import {Order} from "./Order";

export interface Report {
    id: string;
    messages: Message[];

    status: string;
    createdBy: any | string;
    assignedAdmin: Admin | string;
    createdAt: Date;
    updatedAt: Date;
    order: Order | string;
}