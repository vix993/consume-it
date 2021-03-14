import { ProductsData, OrdersData, VouchersData } from "./ProductModels";

export interface ShoppingCartContextData {
    products: ProductsData[];
    orders: OrdersData[];
    total: number;
    discount: number;
    subtotal: number;
    shipping: number;
    vouchers: VouchersData[];
    activeVoucher: VouchersData | undefined;
    buyProduct: (productId: number) => void;
    removeOrder: (orderProductId: number, quantity: number) => void;
    handleVoucherSelection: (discountCode: string) => string;
}