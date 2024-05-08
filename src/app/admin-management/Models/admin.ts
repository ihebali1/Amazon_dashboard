import {ManagementPack} from './ManagementPack';

export interface Admin{
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    active?: boolean;
    role?: string;
    managementPack?: ManagementPack;
}