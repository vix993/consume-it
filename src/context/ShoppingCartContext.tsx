import { createContext, useState, ReactNode } from 'react';

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export const ShoppingCartContext = createContext({})

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState([
        {
            banana: {
                weight: 0,
                price: 10
        }}
    ]);
    const [subtotal, setSubtotal] = useState(234);
    const [discount, setDiscount] = useState(1);
    const [total, setTotal] = useState(243);

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