import React, { useState, useContext } from 'react';

import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from '../styles/components/discount-input.module.css';

interface DiscountInputProps {

}

export const DiscountInput: React.FC<DiscountInputProps> = ({}) => {
    const [discountCodeInput, setDiscountCodeInput] = useState("");
    const [discountCodeMessage, setDiscountCodeMessage] = useState("");
    const { handleVoucherSelection, activeVoucher } = useContext(ShoppingCartContext);

    const handleChange = (e: any) => {
        setDiscountCodeInput(e.target.value)
    }

    const handleSubmitDiscountCode = (e: any) => {
        e.preventDefault();
        const message = handleVoucherSelection(discountCodeInput);
        alert(message);
        setDiscountCodeMessage(message);
        setDiscountCodeInput("");
    }

    return (
        <form className={styles.discount_input_wrapper} onSubmit={handleSubmitDiscountCode}>
            <input
                type="text"
                value={discountCodeInput}
                onChange={handleChange}
                placeholder="Discount code"
            />
            <button type="submit">
                Apply
            </button>
        </form>
    );
}