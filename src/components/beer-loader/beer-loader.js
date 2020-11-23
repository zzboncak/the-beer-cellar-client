import React from "react";
import BeerImage from "../../images/beer-icon.png";

const BeerIcon = (props) => {
	const loadingMessage = props.message ? props.message : "Loading...";
	return (
		<div className="beer-loading-icon-container">
			<img src={BeerImage} className="beer-loading-icon" />
			<p className="loading-text">{loadingMessage}</p>
		</div>
	);
};

export default BeerIcon;
