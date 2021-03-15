import React from "react";

import renderer from "react-test-renderer";

import { renderHook } from "@testing-library/react-hooks"

import { cleanup, render, queryByDisplayValue } from '@testing-library/react';

import { DiscountInput } from '../DiscountInput';

describe("<DiscountInput />", () => {
    afterEach(cleanup);

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
        expect(queryByPlaceholderText('Discount Code'));
        expect(queryByDisplayValue(container, 'Apply'))
    });
})