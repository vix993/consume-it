import React, {useContext} from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import { Product } from './Product';

import styles from '../styles/components/product-display.module.css';

interface ProductDisplayProps {}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({}) => {
    const { products } = useContext(ShoppingCartContext);
    return (
        <section>
            <div className={styles.product_display_wrapper}>
                {products.map((product) => {
                    return (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            available={product.available}
                        />
                    );
                })}
            </div>
        </section>
    );
}