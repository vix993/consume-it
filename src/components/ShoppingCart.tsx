import React from 'react';

import styles from '../styles/components/shopping-cart.module.css';
import { DiscountInput } from './DiscountInput';
import { PricingDetailsList } from './PricingDetailsList';
import { ShoppingCartOrdersList } from './ShoppingCartOrdersList';

interface ShoppingCartProps {

}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({}) => {
        return (
            <aside className={styles.shopping_cart_wrapper}>
                <header>Shopping Cart</header>
                <ShoppingCartOrdersList />
                <DiscountInput />
                <PricingDetailsList />
                
            </aside>
        );
}