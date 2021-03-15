import React, { useContext } from "react";

import { renderHook } from "@testing-library/react-hooks";

import * as renderer from "react-test-renderer";

import { ShoppingCartContext,  } from '../../context/ShoppingCartContext';

describe("<ShoppingCartContext />", () => {
    
    it("Should calculate the Total price based on the current pricing details", () => {
        // const { result, rerender} = renderHook(() => {
        //     return useContext(ShoppingCartContext)
        // })
        
        // const {
        //     handleVoucherSelection, activeVoucher,
        //     total, discount, subtotal, shipping,
        //     vouchers, buyProduct, removeOrder,
        //     updateShippingPrice, updateTotal,
        //     updateSubtotal
        // } = result.current

        // const { result } = renderHook(() => )



        // const { result } = renderHook(() => buyProduct(1), {
        //     wrapper: (props) => (

        //     )
        // })

        // expect(result.current.orders).toBe([]);
        // expect(result.current.subtotal).toEqual(0);
    });
})