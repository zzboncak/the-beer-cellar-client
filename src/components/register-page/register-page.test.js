import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./register-page";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<RegisterPage />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
