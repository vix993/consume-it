import { OrdersData, ProductsData } from '../types/ProductModels';

export const createNewOrdersList = (product: ProductsData, orders: OrdersData[], operation: 'add' | 'subtract') => {
    let newOrders: OrdersData[] = []
    orders.map((order) => {
        if (order.id != product.id) {
            newOrders.push(order)
        } else {
            const quantity = operation === 'add'
                ? order.quantity + 1
                : order.quantity - 1
            newOrders.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity

            })
        }
    })
    return newOrders;
}