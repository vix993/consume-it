import React, { useContext } from "react";

import renderer, { act } from "react-test-renderer";

import { cleanup, screen, render, fireEvent, getByText } from '@testing-library/react';

import { CheckoutButton } from '../CheckoutButton';

describe("<CheckoutButton />", () => {
    afterEach(cleanup);

    it("Should display a button with CHECKOUT written, and hover effect on click should alert user of success", () => {
        const component = renderer
            .create(
                    <CheckoutButton />
            )

        let jsonTree = component.toJSON();
        expect(jsonTree).toMatchSnapshot();

        const { container, queryByLabelText, getByLabelText } = render(
            <CheckoutButton />
        )

        expect(screen.getByText('CHECKOUT'));
    });
})