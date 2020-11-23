import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import "./add-page.css";
import BeerResult from "../beerResult/beerResult";
import UntappdLogo from "../../images/pbu_80_grey.png";
import BeerIcon from "../beer-loader/beer-loader";

const AddPageFunction = (props) => {
	const [userSearch, setUserSearch] = useState("");
	const [beersFromSearch, setBeersFromSearch] = useState([]);
	const [searching, setSearching] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleAddFormSubmit = (e) => {
		e.preventDefault();
		setSearching(true);
		setTouched(true);
		let searchTerm = userSearch.replace(/ /g, "+");
		let url = `${config.API_ENDPOINT}/search/${searchTerm}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setSearching(false);
				setUserSearch("");
				setBeersFromSearch(data.response.beers.items);
			});
	};

	const onSearchChange = (e) => {
		setUserSearch(e.target.value);
	};

	return (
		<div className="add-page">
			<h2 className="page-title">Add a beer</h2>

			<form className="add-form" onSubmit={handleAddFormSubmit}>
				<fieldset className="beer-info">
					<label htmlFor="username">Search:</label>
					<br />
					<input
						name="username"
						type="search"
						placeholder="ex: Pliny the Elder"
						value={userSearch}
						onChange={(e) => onSearchChange(e)}
					/>

					<div className="button-container">
						<button
							className="add-page-button"
							type="submit"
							disabled={!userSearch}
						>
							Let's Go
						</button>
						<Link to="/cellar">
							<button className="add-page-button">Cancel</button>
						</Link>
					</div>
				</fieldset>
			</form>

			<section className="results-section">
				{searching ? (
					<BeerIcon message="Loading your beers..." />
				) : beersFromSearch.length === 0 && !searching && touched ? (
					<div>No beers found</div>
				) : (
					beersFromSearch.map((item, i) => (
						<BeerResult
							key={i}
							bid={item.beer.bid}
							beer_name={item.beer.beer_name}
							beer_description={item.beer.beer_description}
							beer_label={item.beer.beer_label}
							brewery_name={item.brewery.brewery_name}
							history={props.history}
						/>
					))
				)}
			</section>

			<img id="untappd-logo" src={UntappdLogo} alt="powered by Untappd" />
		</div>
	);
};

export default AddPageFunction;
