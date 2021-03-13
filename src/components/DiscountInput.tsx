import React from 'react';

import styles from '../styles/components/discount-input.module.css';

interface DiscountInputProps {

}

export const DiscountInput: React.FC<DiscountInputProps> = ({}) => {
        return (
            <section className={styles.discount_input_wrapper}>
                <input type="text"/>
                <button>
                    Apply
                </button>
            </section>
        );
}