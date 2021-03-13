import React, { useContext } from 'react';

import { ShoppingCartItem } from './ShoppingCartItem'

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/shopping-cart-orders-list.module.css';

interface ShoppingCartOrdersListProps {

}

export const ShoppingCartOrdersList: React.FC<ShoppingCartOrdersListProps> = ({}) => {
    // const { orders } = useContext(ShoppingCartContext)
    const orders = [
    {
        id: 1,
        name: "banana",
        price: 10,
        quantity: 2
    },
    {
        id: 2,
        name: "banana",
        price: 10,
        quantity: 2
    },
    {
        id: 3,
        name: "banana",
        price: 10,
        quantity: 2
    }

]
    return (
        <section className={styles.orders_list_wrapper}>
            {orders.map((order) => {
                return (
                    <ShoppingCartItem
                        key={order.id}
                        name={order.name}
                        price={order.price}
                        quantity={order.quantity}
                    />
                )
            })}
        </section>
    );
}