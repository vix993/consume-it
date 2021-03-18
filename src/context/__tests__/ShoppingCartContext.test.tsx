import React, { useContext } from "react";

import { renderHook } from "@testing-library/react-hooks";

import * as renderer from "react-test-renderer";

import { ShoppingCartContext, ShoppingCartProvider } from '../../context/ShoppingCartContext';

import { ShoppingCart } from '../../components/ShoppingCart';

import { getByTestId, getByText, render } from "@testing-library/react";

import {context} from '../__mock__/testHelpers'

describe("<ShoppingCartContext />", () => {
    
    it("Should render with empty object", () => {
        const { result } = renderHook(() => useContext(ShoppingCartContext))
        expect(result.current).toStrictEqual({})
    });
    it("", () => {
        const { container, queryByTestId } = render(
            <ShoppingCartContext.Provider value={
                {...context, orders: context.orders,
                subtotal: 10, discount: 0, shipping: 30, total: 40}}
            >
                <ShoppingCart />
            </ShoppingCartContext.Provider>
        )
        const subtotalValue = getByText(container, "subtotal");
        expect(subtotalValue.textContent)
    })
})