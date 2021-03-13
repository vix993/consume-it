import React, { useContext } from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/shopping-cart-orders-list.module.css';

interface ShoppingCartOrdersListProps {

}

export const ShoppingCartOrdersList: React.FC<ShoppingCartOrdersListProps> = ({}) => {
    const { products } = useContext(ShoppingCartContext)
    return (
        <section className={styles.orders_list_wrapper}>
            <h1>PRODUCT BOUGHT</h1>
        </section>
    );
}