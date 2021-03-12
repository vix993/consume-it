import React from 'react';

import styles from '../styles/components/shopping-cart.module.css';

interface ShoppingCartProps {

}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({}) => {
        return (
            <aside className={styles.shopping_cart_wrapper}>
                <header>Shopping Cart</header>
                
            </aside>
        );
}