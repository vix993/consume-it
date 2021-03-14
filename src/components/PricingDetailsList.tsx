import React, {useContext} from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/pricing-details-list.module.css';

interface PricingDetailsListProps {

}

export const PricingDetailsList: React.FC<PricingDetailsListProps> = ({}) => {
    const { subtotal, shipping, discount, total, orders } = useContext(ShoppingCartContext);
    const pricingDetails = [
        {key: 'subtotal', value: subtotal.toFixed(2) },
        {key: 'discount', value: discount.toFixed(2) },
        {key: 'shipping', value: shipping.toFixed(2) },
        {key: 'total', value: total.toFixed(2) }
    ]
        return (
            <section className={styles.pricing_details_list_wrapper}>
                {pricingDetails.map((value) => {
                    return (
                        <div key={value.key}>
                            <span>{value.key}</span>
                            <span>$ {value.value}</span>
                        </div>
                    )
                })}
            </section>
        );
}