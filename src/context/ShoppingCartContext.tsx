import { createContext, useState, ReactNode } from 'react';

import {getProducts} from '../repositories/productsRepository';

import * as dummy from '../../dummy.json';

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export const ShoppingCartContext = createContext({})

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(234);
    const [discount, setDiscount] = useState(1);
    const [total, setTotal] = useState(243);

    const availableProducts = getProducts()
        .then(res => {
            console.log(res)
            setProducts(res)
        })
        .catch(err => {
            console.log(err)
        });
    console.log(dummy, availableProducts, products)

    return (
        <ShoppingCartContext.Provider
            value={{
                products,
                setProducts,
                subtotal,
                setSubtotal,
                discount,
                setDiscount,
                total,
                setTotal
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}