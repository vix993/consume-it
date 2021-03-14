import React from 'react';

import styles from '../styles/components/checkout-button.module.css';

interface CheckoutButtonProps {

}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({}) => {

        return (
            <main className={styles.checkout_button_wrapper}>
                <button onClick={() => alert("Payment details (not) sent to your email.")} className={styles.checkout_button}>
                    CHECKOUT
                </button>
            </main>
        );
}