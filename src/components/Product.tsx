import React, { useContext } from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/product.module.css';

interface ProductProps {
    name: string;
    available: number;
    price: number;
    id: number;
}

export const Product: React.FC<ProductProps> = ({name, available, price, id}) => {
    const { buyProduct } = useContext(ShoppingCartContext);
    return (
        <section className={styles.product_wrapper}>
            <div className={styles.product_header}></div>
            <main className={styles.product_description}>
                    <span>{ name }</span>

                <div>
                    <div>$ { price },00</div>

                    <div>{ available } left</div>
                </div>
            </main>
            <div className={styles.product_buy_button_container}>
                <button onClick={() => buyProduct(id)} className={styles.product_buy_button}>
                    BUY
                </button>
            </div>

        </section>
    );
}