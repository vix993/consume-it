import React, {useContext} from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/pricing-details-list.module.css';

interface PricingDetailsListProps {

}

export const PricingDetailsList: React.FC<PricingDetailsListProps> = ({}) => {
    const { subtotal, shipping, discount, total } = useContext(ShoppingCartContext);
    const pricingDetails = [
        {key: 'subtotal', value: subtotal},
        {key: 'discount', value: discount},
        {key: 'shipping', value: shipping},
        {key: 'total', value: total}
    ]
        return (
            <section className={styles.pricing_details_list_wrapper}>
                {pricingDetails.map((value) => {
                    return (
                        <div key={value.key}>
                            <span>{value.key}</span>
                            <span>{value.value}</span>
                        </div>
                    )
                })}
            </section>
        );
}