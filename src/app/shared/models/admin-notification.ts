import { Notification } from "./notification";
export class AdminNotification {

    id!: string;
  
    notification!: Notification;

    isSeen!: boolean;
  
    createdAt!: Date;
  
    updatedAt!: Date;

    icon?:  any;
    colorClass?: string;
}