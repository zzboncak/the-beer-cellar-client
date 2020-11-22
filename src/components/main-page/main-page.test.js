import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./main-page";
import BeerContext from "../../BeerContext";
import demoData from "../../demo";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<BeerContext.Provider value={{ beers: demoData }}>
				<MainPage />
			</BeerContext.Provider>
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
