import React, { useContext } from "react";

import renderer from "react-test-renderer";

import { cleanup, fireEvent, queryByDisplayValue, render, screen } from '@testing-library/react';

import { ShoppingCartItem } from '../ShoppingCartItem';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

import { renderHook } from "@testing-library/react-hooks";

import { ShoppingCartContextData } from "../../types/ShoppingCartContextData";

import { context } from "../../context/__mock__/testHelpers";

const renderDiscountInput = (values: ShoppingCartContextData) => {
    return render(
        <ShoppingCartContext.Provider value={values}>
            <ShoppingCartItem name={values.orders[0].name} price={values.orders[0].price} quantity={values.orders[0].quantity} id={values.orders[0].id}/>
        </ShoppingCartContext.Provider>
    )
}

describe("<ShoppingCartItem />", () => {
    afterEach(cleanup);

    it("should render", () => {        
        renderDiscountInput(context);
        expect(screen.getByText(context.orders[0].name)).toBeTruthy()
    })

    it("should subtract 1 from quantity", () => {
        const { container } = renderDiscountInput(context)
        const addButton = container.querySelector('[id="test-shop-item-sub"]')
        if (addButton)
            fireEvent.click(addButton, { button: 0 })
    })
})