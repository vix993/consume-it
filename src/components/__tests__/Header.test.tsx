import React, { useContext } from "react";

import renderer from "react-test-renderer";

import { cleanup, queryByDisplayValue, render, screen } from '@testing-library/react';

import { Header } from '../Header';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

import { ShoppingCartContextData } from "../../types/ShoppingCartContextData";

import { context } from "../../context/__mock__/testHelpers";

const renderHeader = (values: ShoppingCartContextData) => {
    return render(
        <ShoppingCartContext.Provider value={values}>
            <Header/>
        </ShoppingCartContext.Provider>
    )
}

describe("<Header />", () => {
    afterEach(cleanup);

    it("renders correctly", () => {        
        renderHeader(context);
        expect(screen.getByText("Jerry")).toBeTruthy()
    })

    it("Should Match snapshot", () => {
        const component = renderer
            .create(
                    <Header />
            )

        let jsonTree = component.toJSON();
        expect(jsonTree).toMatchSnapshot();
    });
})