import React from 'react';

import styles from '../styles/components/shopping-cart-item.module.css';

interface ShoppingCartItemProps {
    name: string;
    quantity: number;
    price: number;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({name, quantity, price}) => {
        return (
            <main className={styles.card_item_wrapper}>
                <section className={styles.card_item_container}>
                    <div className={styles.card_item_tooltip}></div>
                    <div className={styles.card_item_description}>
                        <h4>{name}</h4>
                        <section>
                            <span>Quantity: {quantity}</span>
                            <span>$ {price}.00</span>
                        </section>
                    </div>
                    <div className={styles.card_item_buttons}>
                        <button>+</button>
                        <button>-</button>
                    </div>
                    {/* PRODUCT BOUGHT */}
                </section>
            </main>
        );
}