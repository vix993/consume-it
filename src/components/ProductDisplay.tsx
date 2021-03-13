import React, {useContext} from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import { Product } from './Product';

import styles from '../styles/components/product-display.module.css';

interface ProductDisplayProps {

}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({}) => {
    const { products } = useContext(ShoppingCartContext);
    console.log(products)
    return (
        <section>
            <div className={styles.product_display_wrapper}>
                {products.map((product) => {
                    console.log(product.name)
                    return (
                        <Product
                            key={product.id}
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