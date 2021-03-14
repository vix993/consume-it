export interface ProductsData {
    available: number;
    id: number;
    name: string;
    price: number;
}

export interface OrdersData {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface VouchersData {
    id: number;
    code: string;
    type: 'percentual' | 'fixed' | 'shipping';
    amount: number;
    minValue?: number;
}