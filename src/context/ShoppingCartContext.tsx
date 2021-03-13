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

interface ShoppingCartContextData {
    products: ProductsData[]
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(234);
    const [discount, setDiscount] = useState(1);
    const [total, setTotal] = useState(243);

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
    

    return (
        <ShoppingCartContext.Provider
            value={{
                products,
                // setProducts,
                // subtotal,
                // setSubtotal,
                // discount,
                // setDiscount,
                // total,
                // setTotal
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}