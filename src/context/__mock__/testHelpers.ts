import { ShoppingCartContextData } from '../../types/ShoppingCartContextData';
import {data} from  './dummy';

export const context: ShoppingCartContextData = {
    handleVoucherSelection: jest.fn(),
    products: data,
    orders: [
        {id: 1, name: 'Banana', price: 10, quantity:2},
        {id: 2, name: 'Apple', price: 10, quantity:2},
        {id: 3, name: 'Mango', price: 10, quantity:2},
        {id: 4, name: 'Pear', price: 10, quantity:2}
    ],
    total: 0,
    discount: 0,
    subtotal: 0,
    shipping: 0,
    vouchers: [{
        id:	3,
        code: "#SHIPIT",
        type: "shipping",
        amount: 0,
        minValue: 300.5
    }],
    activeVoucher: {
        id:	3,
        code: "#SHIPIT",
        type: "shipping",
        amount: 0,
        minValue: 300.5
    },
    buyProduct: jest.fn().mockImplementation((number) => {}),
    removeOrder: jest.fn().mockImplementation((number, num) => {}),
    updateShippingPrice: jest.fn(),
}