import React, { useContext } from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/shopping-cart-item.module.css';

interface ShoppingCartItemProps {
    name: string;
    quantity: number;
    price: number;
    id: number;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({name, quantity, price, id}) => {
    const { removeOrder, buyProduct, updateShippingPrice } = useContext(ShoppingCartContext);
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
                        <button onClick={() => buyProduct(id)}>+</button>
                        <button
                            onClick={() => {
                                removeOrder(id, quantity);
                                updateShippingPrice();

                        }}>-</button>
                    </div>
                    {/* PRODUCT BOUGHT */}
                </section>
            </main>
        );
}