import React, { useContext } from "react";

import * as renderer from "react-test-renderer";

import { ShoppingCartContext, ShoppingCartProvider, ShoppingCartProviderProps } from '../../context/ShoppingCartContext';

import { CheckoutButton } from '../CheckoutButton';

describe("<CheckoutButton />", () => {
    
    it("Should display a button with CHECKOUT written, on click should alert user of success", () => {
        const tree = renderer
            .create(<CheckoutButton />)
            .toJSON()
        expect(tree).toMatchSnapshot();
    });
})