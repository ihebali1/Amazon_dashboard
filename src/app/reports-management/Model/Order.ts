export interface Order {
    id: string;
    orderId: string;
    totalPrice: number;
    platformGainPercentage: number;
    status: any;
    lineItems: any[] | string[];
    client: any | string;
    vendor: any | string;
    paymentInfo: any | string;
    shippingInfo: any | string;
    report: any;
    orderedAt: Date;
    deliveredAt: Date;
    canceledAt: Date;
    deliveryStartedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}