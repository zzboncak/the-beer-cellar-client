import React from "react";
import ReactDOM from "react-dom";
import BeerResult from "./beerResult";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<BeerResult />, div);
	ReactDOM.unmountComponentAtNode(div);
});
