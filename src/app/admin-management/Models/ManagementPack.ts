import {Admin} from "./admin";
import {Permission} from "./Permission";

export interface ManagementPack{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: Permission[];
    admins: Admin[];
}