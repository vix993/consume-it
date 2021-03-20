import React, { useContext } from "react";

import renderer from "react-test-renderer";

import {
  cleanup,
  fireEvent,
  queryByDisplayValue,
  render,
  screen,
} from "@testing-library/react";

import { Product } from "../Product";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import { renderHook } from "@testing-library/react-hooks";

import { ShoppingCartContextData } from "../../types/ShoppingCartContextData";

import { context } from "../../context/__mock__/testHelpers";

const renderProduct = (values: ShoppingCartContextData) => {
  return render(
    <ShoppingCartContext.Provider value={values}>
      <Product
        name={values.products[0].name}
        available={values.products[0].available}
        id={values.products[0].id}
        price={values.products[0].price}
      />
    </ShoppingCartContext.Provider>
  );
};

describe("<Product />", () => {
  afterEach(cleanup);

  it("", () => {
    renderProduct(context);
    expect(screen.getByText("BUY")).toBeTruthy();
  });

  it("Should display product with given input", () => {
    const component = renderer.create(<Product name={context.products[0].name}
        available={context.products[0].available}
        id={context.products[0].id}
        price={context.products[0].price}/>);

    let jsonTree = component.toJSON();
    expect(jsonTree).toMatchSnapshot();

    const { container, queryByPlaceholderText } = render(<Product name={context.products[0].name}
        available={context.products[0].available}
        id={context.products[0].id}
        price={context.products[0].price}/>);
    expect(screen.getAllByText("Banana")).toBeTruthy();
    expect(screen.queryAllByDisplayValue("10")).toBeTruthy();
  });
});
