import { createContext, useState, ReactNode, useEffect } from 'react';

import { getProducts } from '../repositories/productsRepository';
import { getVouchers } from 'src/repositories/vouchersRepository';

import { ProductsData, VouchersData, OrdersData } from '../types/ProductModels';
import { ShoppingCartContextData } from 'src/types/ShoppingCartContextData';

import * as dummy from '../dummy.json';
import { createNewOrdersList } from 'src/utils/shoppingCartUtils';


export interface ShoppingCartProviderProps {
    children: ReactNode;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState<ProductsData[]>([]);
    const [orders, setOrders] = useState<OrdersData[]>([]);
    const [vouchers, setVouchers] = useState<VouchersData[]>([]);
    const [activeVoucher, setActiveVoucher] = useState<VouchersData>();
    const [weightOfPurchase, setWeightOfPurchase] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    // fetching product data
    const requestProducts = async () => {
        await getProducts()
            .then((res: any) => {
                if (!res.error)
                    setProducts(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
        // console.log(products);
    }

    const requestVouchers = async () => {
        await getVouchers()
            .then(async (res: any) => {
                console.log(res)
                if (!res.error){
                    setVouchers(res)
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
        // console.log('vouchers', vouchers);
    }

    useEffect(() => {
        requestProducts();
        requestVouchers();
    }, []);

    const updateWeightOfPurchase = () => {
        let newWeight = 0;
        orders.map((order) => {newWeight += order.quantity});
        // console.log(newWeight)
        setWeightOfPurchase(newWeight);
    }

    const updateShippingPrice = () => {
        console.log('hello')
        if (subtotal > 400
            || activeVoucher
            && (activeVoucher.type == 'shipping'
            && subtotal > activeVoucher.minValue!)
            ) {
            setShipping(0);
            return
        }
        console.log('hi')
        if (weightOfPurchase === 0){
            setShipping(0);
            return
        }

        console.log('hi there')
        if (weightOfPurchase === 1)
            setShipping(30);
        // quick math, round multiple of 5, 10kg threshold subtracted
        // div by 5 to get multiplication number added to current shipping
        if (weightOfPurchase % 5 === 0) {
            const baseShipping = weightOfPurchase === 0 ? 0 : 30;
            const addedShipping = ((weightOfPurchase * 7) / 5)
            setShipping(baseShipping + addedShipping)
            console.log('added shipping', addedShipping, 'shipping', shipping)
        }
    }
    console.log(activeVoucher)

    const updateSubtotal = () => {
        let newSubtotal = 0;
        orders.map((order) => {
            newSubtotal += order.price * order.quantity
        })
        // console.log('new subtotal', newSubtotal);
        if (activeVoucher && activeVoucher.type === 'percentual') {
            newSubtotal = subtotal - (subtotal * (activeVoucher.amount / 100));
        }
        setSubtotal(newSubtotal);
    }

    const updateTotal = () => {
        const newTotal = (subtotal + shipping) - discount;

        if (activeVoucher && activeVoucher.type === 'fixed') {
            const newTotal = total > activeVoucher.amount
                ? subtotal - activeVoucher.amount
                : 0;
            setTotal(newTotal);
        }
        setTotal(newTotal);
    }

    const updateOrders = (product: ProductsData) => {
        const newProductPurchased = orders.filter(order => order.id === product.id);
        if (newProductPurchased[0]) {
            setOrders(createNewOrdersList(product, orders, 'add'));
        }
        else {
            setOrders([...orders, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }])
        }
    }

    const handleVoucherSelection = (discountCode: string) => {
        const voucherSelection = vouchers.filter((voucher) => voucher.code === discountCode)[0];
        if (!voucherSelection)
            return "code invalid";
        console.log(activeVoucher === voucherSelection, voucherSelection)
        if (activeVoucher)
            return "code active";
        setActiveVoucher(voucherSelection)
        return "discount applied"
    }

    const buyProduct = (productId: number) => {
        let product = products.filter((product) => product.id === productId)[0]
        console.log(product, products)
        
        // If product is available:
        // update stock, add to orders
        // update pricing details
        if (product.available > 0) {
            const newProductsData = products.filter((prod: ProductsData) => product.id != prod.id);
            product.available--;
            const newProducts = [...newProductsData, product];
            updateOrders(product);
            setProducts(newProducts.sort((prod, prod1) => prod.id - prod1.id));
            updateWeightOfPurchase();
        }
    }

    const removeOrder = (orderProductId: number, quantity: number) => {
        const changedOrderProduct = products.filter((product) => product.id === orderProductId)[0];
        if (quantity > 0)
            setOrders(createNewOrdersList(changedOrderProduct, orders, 'subtract'));
        // console.log('removing order', orders);
        // TODO ################# TODO ##############
        // restock unwanted products
        // const unchangedProducts = products.filter((product) => product.id !== orderProductId);
        // let newChangedProduct: ProductsData | null = null;
        // products.map((order))
    }

    // update weight everytime order changes
    useEffect(() => {
        updateWeightOfPurchase();
        updateSubtotal();
    }, [orders, products, activeVoucher]);

    useEffect(() => {
        updateShippingPrice();
    }, [weightOfPurchase, activeVoucher])

    useEffect(() => {
        updateTotal();
    }, [subtotal, shipping, discount, activeVoucher]);

    return (
        <ShoppingCartContext.Provider
            value={{
                products,
                orders,
                subtotal,
                discount,
                total,
                shipping,
                vouchers,
                buyProduct,
                removeOrder,
                handleVoucherSelection
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}