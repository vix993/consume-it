import React, { useState, useContext } from "react";

import { ShoppingCartContext } from "../context/ShoppingCartContext";

import styles from "../styles/components/discount-input.module.css";

interface DiscountInputProps {}

export const DiscountInput: React.FC<DiscountInputProps> = ({}) => {
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [discountCodeMessage, setDiscountCodeMessage] = useState("");
  const { handleVoucherSelection, activeVoucher } = useContext(
    ShoppingCartContext
  );

  const handleChange = (e: any) => {
    setDiscountCodeInput(e.target.value);
  }
  // Will fire an alert with outcome reliant message
  const handleSubmitDiscountCode = (e: any) => {
    e.preventDefault();
    const message = handleVoucherSelection(discountCodeInput);
    alert(message);
    setDiscountCodeMessage(message);
    setDiscountCodeInput("");
  };

  return (
    <form
      className={styles.discount_input_wrapper}
      onSubmit={handleSubmitDiscountCode}
      id="test-form-disc"
    >
      <input
        type="text"
        value={discountCodeInput}
        onChange={handleChange}
        placeholder="Discount code"
        id="test-form-disc-input"
      />
      <button type="submit" id="test-form-disc-sub">Apply</button>
    </form>
  );
};
