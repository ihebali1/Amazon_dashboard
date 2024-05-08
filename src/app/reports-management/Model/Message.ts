import {Report} from './report';
import {Admin} from '../../admin-management/Models/admin';
import {User} from './User';

export interface Message {
    id: string;
    content: string;
    user: User | string;
    admin: Admin | string;
    report: Report | string;
    image: File | string;
    video: File | string;
    createdAt: Date;
    updatedAt: Date;
}
