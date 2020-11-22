import React from "react";
import ReactDOM from "react-dom";
import Beer from "./beer";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Beer />, div);
	ReactDOM.unmountComponentAtNode(div);
});
