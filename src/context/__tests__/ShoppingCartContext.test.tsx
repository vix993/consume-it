import React, { useContext } from "react";

import { renderHook } from "@testing-library/react-hooks";

import * as renderer from "react-test-renderer";

import { ShoppingCartContext,  } from '../../context/ShoppingCartContext';

describe("<ShoppingCartContext />", () => {
    it("Should calculate the Total price based on the current pricing details", () => {
        const { result, rerender} = renderHook(() => {
            return useContext(ShoppingCartContext)
        })
        
        const {
            handleVoucherSelection, activeVoucher,
            total, discount, subtotal, shipping,
            vouchers, buyProduct, removeOrder,
            updateShippingPrice,
        } = result.current

        expect(result.current);
    });
})