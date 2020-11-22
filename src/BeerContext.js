import React from "react";

const BeerContext = React.createContext({
	userBeers: [],
	updateBeersInState: () => {},
	updateSingleBeerInState: () => {},
});

export default BeerContext;
