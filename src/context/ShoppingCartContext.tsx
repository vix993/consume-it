import { createContext, useState, ReactNode, useEffect } from 'react';

import { getProducts } from '../repositories/productsRepository';
import { getVouchers } from '../repositories/vouchersRepository';

import { ProductsData, VouchersData, OrdersData } from '../types/ProductModels';
import { ShoppingCartContextData } from '../types/ShoppingCartContextData';

import { createNewOrdersList } from '../utils/shoppingCartUtils';

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
    const [shippingOffset, setShippingOffset] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    // fetching product data
    // failed responses stop
    // product display from rendering
    const requestProducts = async () => {
        await getProducts()
            .then((res: any) => {
                if (!res.error)
                    setProducts(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    // fetching voucher data
    // failed request prompts "invalid code"
    // for voucher input
    const requestVouchers = async () => {
        await getVouchers()
            .then(async (res: any) => {
                if (!res.error){
                    setVouchers(res);
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
    }

    useEffect(() => {
        requestProducts();
        requestVouchers();
    }, []);
    // weight calculated on purchase or removal
    const updateWeightOfPurchase = () => {
        let newWeight = 0;
        orders.map((order) => {newWeight += order.quantity});
        setWeightOfPurchase(newWeight);
    }
    // discount becomes shipping price
    // if pertinent voucher is selected
    // validates that shipping is over 400 or 0
    // adds 7 if weight is greater than 14
    const updateShippingPrice = () => {
        if (activeVoucher
            && (activeVoucher.type == 'shipping'
            && subtotal > activeVoucher.minValue!)
            ) {
            setDiscount(shipping)
            return
        }
        if (subtotal > 400) {
            setShipping(0);
            return
        }
        if (weightOfPurchase === 0){
            setShipping(0);
            return
        }
        if (weightOfPurchase === 1)
            setShipping(30);
        if (weightOfPurchase % 5 === 0 || weightOfPurchase % 5 === 4) {
            const baseShipping = weightOfPurchase === 0 ? 0 : 30;
            if (weightOfPurchase < 14){
                const newOffset = (((weightOfPurchase - (weightOfPurchase % 5)) / 5) * 7);
                setShippingOffset(newOffset);
            }
            
            const addedShipping = (((weightOfPurchase - (weightOfPurchase % 5)) * 7) / 5) - shippingOffset
            setShipping(baseShipping + addedShipping)
        }
    }
    // subtotal calc -> iterate orders and add price with quantity
    // subtracts percentage if voucher selected
    const updateSubtotal = () => {
        let newSubtotal = 0;
        orders.map((order) => {
            newSubtotal += order.price * order.quantity
        })
        if (activeVoucher && activeVoucher.type === 'percentual') {
            let newDiscount;
            if (subtotal > 400) {
                newDiscount = (newSubtotal * activeVoucher.amount / 100) + shipping;
            } else {
                newDiscount = newSubtotal * activeVoucher.amount / 100
            }
            setDiscount(newDiscount);
        }
        setSubtotal(newSubtotal);
    }
    // calcs total after checking if fixed voucher
    const updateTotal = () => {
        if (activeVoucher && activeVoucher.type === 'fixed') {
            setDiscount(activeVoucher.amount);
        }
        const newTotal = (subtotal + shipping) - discount;
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
    // finds apropriate voucher for discount code if aplicable
    // alocates display message and sets active voucher to state
    const handleVoucherSelection = (discountCode: string) => {
        const voucherSelection = vouchers.filter((voucher) => voucher.code === discountCode)[0];
        if (!voucherSelection)
            return "code invalid";
        console.log(activeVoucher === voucherSelection, voucherSelection);
        if (activeVoucher)
            return "code already active";
        setActiveVoucher(voucherSelection)
        return "discount applied"
    }
    // checks if product is available and sums to orders
    const buyProduct = (productId: number) => {
        let product = products.filter((product) => product.id === productId)[0]
        
        if (product.available > 0) {
            const newProductsData = products.filter((prod: ProductsData) => product.id != prod.id);
            product.available--;
            const newProducts = [...newProductsData, product];
            updateOrders(product);
            setProducts(newProducts.sort((prod, prod1) => prod.id - prod1.id));
            updateWeightOfPurchase();
        }
    }
    // checks if orders exist to remove and does it
    const removeOrder = (orderProductId: number, quantity: number) => {
        const changedOrderProduct = products.filter((product) => product.id === orderProductId)[0];
        if (quantity > 0)
            setOrders(createNewOrdersList(changedOrderProduct, orders, 'subtract'));

        const unchangedProducts = products.filter((product) => product.id !== orderProductId);
        const changedProduct = {...changedOrderProduct, available: changedOrderProduct.available + 1}
        const newProducts = [...unchangedProducts, changedProduct].sort((prod, prod1) => prod.id - prod1.id)
        setProducts(newProducts)
    }

    useEffect(() => {
        updateWeightOfPurchase();
        updateSubtotal();
    }, [orders, products, discount, activeVoucher]);

    useEffect(() => {
        updateShippingPrice();
    }, [weightOfPurchase, discount, shippingOffset, removeOrder])

    useEffect(() => {
        updateTotal();
    }, [subtotal, shipping, discount, activeVoucher, handleVoucherSelection]);

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
                activeVoucher,
                buyProduct,
                removeOrder,
                handleVoucherSelection,
                updateShippingPrice
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}