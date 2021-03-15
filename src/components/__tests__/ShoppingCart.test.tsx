import React, { useContext } from "react";

import renderer from "react-test-renderer";

import { cleanup, render } from '@testing-library/react';

import { renderHook } from '@testing-library/react-hooks';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

import { ShoppingCart } from '../ShoppingCart';

describe("<ShoppingCart />", () => {
    afterEach(cleanup);
    it("Should render shopping cart with children that have state influenced rendering", () => {
        const { result, rerender} = renderHook(() => {
            return useContext(ShoppingCartContext)
        })

        const values = result.current
        const component = renderer
            .create(
                <ShoppingCartContext.Provider value={
                    {...values, orders: [{id: 1, name: 'Banana', price: 10, quantity:2}],
                    subtotal: 10, discount: 0, shipping: 30, total: 40}}
                >
                    <ShoppingCart />
                </ShoppingCartContext.Provider>
            )

        const { container, queryByTitle } = render(
            <ShoppingCartContext.Provider value={
                {...values, orders: [{id: 1, name: 'Banana', price: 10, quantity:2}],
                subtotal: 10, discount: 0, shipping: 30, total: 40}}
            >
                <ShoppingCart />
            </ShoppingCartContext.Provider>
        )
        expect(queryByTitle('Shopping Cart'));
    });
})