import React, { useContext } from "react";

import renderer from "react-test-renderer";

import { cleanup, queryAllByDisplayValue, queryByDisplayValue, render } from '@testing-library/react';

import { renderHook } from '@testing-library/react-hooks';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

import { ShoppingCart } from '../ShoppingCart';

describe("<ShoppingCart />", () => {
    afterEach(cleanup);

    const orders = [
        {id: 1, name: 'Banana', price: 10, quantity:2},
        {id: 2, name: 'Apple', price: 10, quantity:2},
        {id: 3, name: 'Mango', price: 10, quantity:2},
        {id: 4, name: 'Pear', price: 10, quantity:2}
    ]
    it("Should render shopping cart with children that have context influenced rendering", () => {
        const { result, rerender} = renderHook(() => {
            return useContext(ShoppingCartContext)
        })

        const values = result.current

        const { container, queryByTestId } = render(
            <ShoppingCartContext.Provider value={
                {...values, orders: orders,
                subtotal: 10, discount: 0, shipping: 30, total: 40}}
            >
                <ShoppingCart />
            </ShoppingCartContext.Provider>
        )

        expect(container);
        expect(queryAllByDisplayValue(container, 'Shopping Cart')).toBeTruthy();
    });
})