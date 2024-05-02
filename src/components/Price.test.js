import Price from "./Price";
import React, { render } from "@testing-library/react";

describe(Price, () => {
    it("total is 0 at the start", () => {
        const {getByTestId} = render(<Price />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const totalValue = getByTestId("total").textContent;
        expect(totalValue).toBe("10.00 DKK");
    });
}) 