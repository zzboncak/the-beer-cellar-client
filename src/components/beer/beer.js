import React from "react";
import "./beer.css";
import config from "../../config";
import TokenService from "../../services/token-service";
import BeerContext from "../../BeerContext";

class Beer extends React.Component {
	static contextType = BeerContext;

	state = {
		isExpanded: false,
	};

	handleBeerClick = (e) => {
		this.setState({
			isExpanded: !this.state.isExpanded,
		});
	};

	updateQuantity(newQuantity) {
		if (TokenService.hasAuthToken()) {
			//if logged in, update the quantity in the database
			let updateFields = {
				inventory_id: this.props.inventory,
				updatedQuantity: newQuantity,
			};

			fetch(`${config.API_ENDPOINT}/cellar/inventory`, {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${TokenService.getAuthToken()}`,
				},
				body: JSON.stringify(updateFields),
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(
							"Could not update quantity. Sorry bro..."
						);
					}
					//if the API call is successful, also update in the app's state for quick rerender of the quantity amount
					this.context.updateSingleBeerInState(
						this.props.index,
						"quantity",
						newQuantity
					);
				})
				.catch((err) => console.log(err));
		} else {
			//if in demo mode, bypass the API call and just update the quantity in state
			this.context.updateSingleBeerInState(
				this.props.index,
				"quantity",
				newQuantity
			);
		}
	}

	handleMinusClick = (e) => {
		e.stopPropagation();
		if (this.props.quantity > 0) {
			const newQuantity = this.props.quantity - 1;
			this.updateQuantity(newQuantity);
		}
	};

	handlePlusClick = (e) => {
		e.stopPropagation();
		const newQuantity = this.props.quantity + 1;
		this.updateQuantity(newQuantity);
	};

	handleDelete = () => {
		if (TokenService.hasAuthToken()) {
			if (window.confirm("Are you sure you want to delete this beer?")) {
				//because this permanently deletes the inventory line from the database, confirm with the user he/she wants to delete
				fetch(`${config.API_ENDPOINT}/cellar/inventory`, {
					method: "DELETE",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${TokenService.getAuthToken()}`,
					},
					body: JSON.stringify({
						inventory_id: this.props.inventory,
					}),
				})
					.then((res) => {
						if (!res.ok) {
							throw new Error(
								"Could not delete beer. Sorry bro..."
							);
						}
						this.props.handleBeerDelete(this.props.inventory);
					})
					.catch((err) => console.log(err));
			}
		} else {
			if (window.confirm("Are you sure you want to delete this beer?")) {
				this.props.handleBeerDelete(this.props.inventory);
			}
		}
	};

	render() {
		return (
			<div className="beer" onClick={this.handleBeerClick}>
				<div className="beer-image-name">
					<img
						src={this.props.image}
						alt="beer label"
						className="beer-label"
					/>
					<h3>
						<strong>{this.props.name}</strong>
					</h3>
				</div>
				<p>{this.props.brewery}</p>
				<div className="rating-quantity-container">
					<p>Untappd Rating: {this.props.rating}</p>
					<div className="quantity-container">
						<button
							className="minus-button"
							onClick={this.handleMinusClick}
							disabled={this.props.quantity <= 0}
						>
							-
						</button>
						<p>{this.props.quantity}x</p>
						<button
							className="plus-button"
							onClick={this.handlePlusClick}
						>
							+
						</button>
					</div>
				</div>
				{this.state.isExpanded && (
					<div className="expand-container">
						<p className="beer-description">
							{this.props.description}
						</p>
						<p className="delete-label">
							Remove from my cellar:{" "}
							<span
								className="delete-icon"
								role="img"
								aria-label="delete"
								onClick={this.handleDelete}
							>
								❌
							</span>
						</p>
					</div>
				)}
			</div>
		);
	}
}

export default Beer;
