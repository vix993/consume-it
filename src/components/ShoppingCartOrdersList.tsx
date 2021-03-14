import React, { useContext } from 'react';

import { ShoppingCartItem } from './ShoppingCartItem'

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/shopping-cart-orders-list.module.css';

interface ShoppingCartOrdersListProps {

}

export const ShoppingCartOrdersList: React.FC<ShoppingCartOrdersListProps> = ({}) => {
    const { orders } = useContext(ShoppingCartContext);
    return (
        <section className={styles.orders_list_wrapper}>
            {orders.map((order) => {
                return (
                    <React.Fragment key={order.id}>
                        {order.quantity > 0 && <ShoppingCartItem
                            key={order.id}
                            id={order.id}
                            name={order.name}
                            price={order.price}
                            quantity={order.quantity}
                        />}
                    </ React.Fragment>
                )
            })}
        </section>
    );
}