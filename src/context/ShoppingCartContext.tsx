import { createContext, useState, ReactNode, useEffect } from 'react';

import {getProducts} from '../repositories/productsRepository';

import * as dummy from '../dummy.json';

interface ShoppingCartProviderProps {
    children: ReactNode;
}

interface ProductsData {
    available: number;
    id: number;
    name: string;
    price: number;
}

interface OrdersData {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface VouchersData {
    id: number;
    code: string;
    type: string;
    amount: number;
}

interface ShoppingCartContextData {
    products: ProductsData[];
    orders: OrdersData[];
    total: number;
    discount: number;
    subtotal: number;
    shipping: number;
    activeVoucher: VouchersData[];
    vouchers: VouchersData[];
    // setActiveVoucher: () => void;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState<ProductsData[]>([]);
    const [orders, setOrders] = useState<OrdersData[]>([]);
    const [vouchers, setVouchers] = useState<VouchersData[]>([]);
    const [activeVoucher, setActiveVoucher] = useState<VouchersData[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    // fetching product data

    useEffect(() => {
        getProducts()
            .then((res: any) => {
                console.log(res)
                if (!res.status)
                    setProducts(res)
            })
            .catch((err: any) => {
                console.log(err)
            });
        console.log(products)
    }, []);

    const buyProduct = (product: ProductsData) => {
        if (product.available > 0) {

            const newProductsData = products.filter((prod: ProductsData) => product.id != prod.id)
            product.available--;
            const newProducts = [...newProductsData, product]
            setProducts(newProducts)
        }
    }
    

    return (
        <ShoppingCartContext.Provider
            value={{
                products,
                orders,
                // setProducts,
                subtotal,
                // setSubtotal,
                discount,
                // setDiscount,
                total,
                // setTotal,
                shipping,
                vouchers,
                activeVoucher,
                // setActiveVoucher

            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}