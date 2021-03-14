import { createNewOrdersList } from './shoppingCartUtils';
import dummy from '../dummy.json';

test("Unit testing dynamic order list editing adding product quantity", () => {
    const orders = [
        {
            name: "Banana",
            id: 1,
            quantity: 2,
            price: 20
        }
    ]
    const product = {
        name: "Banana",
        id: 1,
        price: 20,
        available: 1
    }
    const newOrders = createNewOrdersList(product, orders, "add");
    const expected = [
        {
            name: "Banana",
            id: 1,
            quantity: 3,
            price: 20
        }
    ]
    expect(newOrders).toStrictEqual(expected);
})

test("Unit testing dynamic order list editing sebtracting product quantity", () => {
    const orders = [
        {
            name: "Banana",
            id: 1,
            quantity: 2,
            price: 20
        }
    ]
    const product = {
        name: "Banana",
        id: 1,
        price: 20,
        available: 1
    }
    const newOrders = createNewOrdersList(product, orders, "subtract");
    const expected = [
        {
            name: "Banana",
            id: 1,
            quantity: 1,
            price: 20
        }
    ]
    expect(newOrders).toStrictEqual(expected);
})