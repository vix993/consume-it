import React from 'react';

import { Product } from './Product';

interface ProductDisplayProps {

}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({}) => {
        return (
            <section>
                Product Display
                <Product/>
            </section>
        );
}