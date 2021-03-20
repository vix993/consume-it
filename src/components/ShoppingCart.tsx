import React from 'react';

import styles from '../styles/components/shopping-cart.module.css';
import { CheckoutButton } from './CheckoutButton';
import { DiscountInput } from './DiscountInput';
import { PricingDetailsList } from './PricingDetailsList';
import { ShoppingCartOrdersList } from './ShoppingCartOrdersList';

interface ShoppingCartProps {}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({}) => {
        return (
            <aside className={styles.shopping_cart_wrapper} id="test-sh-cart">
                <header>Shopping Cart</header>
                <ShoppingCartOrdersList />
                <DiscountInput />
                <PricingDetailsList />
                <CheckoutButton />
                
            </aside>
        );
}