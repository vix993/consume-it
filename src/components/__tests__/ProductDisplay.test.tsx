import React from "react";

import { cleanup, fireEvent, queryByDisplayValue, render, screen } from '@testing-library/react';

import { ProductDisplay } from '../ProductDisplay';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';


import { ShoppingCartContextData } from "../../types/ShoppingCartContextData";

import { context } from "../../context/__mock__/testHelpers";

const renderProductDisplay = (values: ShoppingCartContextData) => {
    return render(
        <ShoppingCartContext.Provider value={values}>
            <ProductDisplay />
        </ShoppingCartContext.Provider>
    )
}

describe("<ProductDisplay />", () => {
    afterEach(cleanup);

    it("Should render a product list with context provided values", () => {
        const {container }= renderProductDisplay(context)
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Banana'))
    });
})