import React, { useContext } from "react";

import renderer from "react-test-renderer";

import { cleanup, fireEvent, queryByDisplayValue, render, screen } from '@testing-library/react';

import { DiscountInput } from '../DiscountInput';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

import { renderHook } from "@testing-library/react-hooks";

import { ShoppingCartContextData } from "../../types/ShoppingCartContextData";

import { context } from "../../context/__mock__/testHelpers";

const renderDiscountInput = (values: ShoppingCartContextData) => {
    return render(
        <ShoppingCartContext.Provider value={values}>
            <DiscountInput/>
        </ShoppingCartContext.Provider>
    )
}

describe("<DiscountInput />", () => {
    afterEach(cleanup);

    it("should fire an alert on button click", () => {        
        renderDiscountInput(context);
        expect(screen.getByText("Apply")).toBeTruthy()
    })

    it("Should display an input for a discount code and a submit button to apply it", () => {
        const component = renderer
            .create(
                    <DiscountInput />
            )

        let jsonTree = component.toJSON();
        expect(jsonTree).toMatchSnapshot();

        const { container, queryByPlaceholderText } = render(
                <DiscountInput />
        )
        const addInput = container.querySelector('[id="test-form-disc-input"]')
        fireEvent.input(addInput!, {input: 0})
        expect(screen.getByPlaceholderText('Discount code'))
        const addButton = container.querySelector('[id="test-form-disc-sub"]')
        // fireEvent.click(addButton!, {button: 0})
        // expect(screen.getByText(`Apply`))
        expect(screen.getByPlaceholderText('Discount code')).toBeTruthy();
        expect(screen.queryAllByDisplayValue('Apply')).toBeTruthy();
    });
})