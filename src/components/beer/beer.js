import React from 'react';
import './beer.css';
import config from '../../config';
import TokenService from '../../services/token-service';

class Beer extends React.Component {
    
    state = {
        isExpanded: false,
        quantity: this.props.quantity
    }

    handleBeerClick = (e) => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    updateQuantity(newQuantity) {
        this.setState({ quantity: newQuantity });
        let updateFields = {
            inventory_id: this.props.inventory,
            updatedQuantity: newQuantity
        };

        fetch(`${config.getEndpoint()}/cellar/inventory`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(updateFields)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('Could not update quantity. Sorry bro...')
                }
                console.log(`Quantity updated to ${newQuantity}!`);
            })
            .catch(err => console.log(err))
    }

    handleMinusClick = (e) => {
        e.stopPropagation();
        const newQuantity = this.state.quantity - 1;
        this.updateQuantity(newQuantity);
    }

    handlePlusClick = (e) => {
        e.stopPropagation();
        const newQuantity = this.state.quantity + 1;
        this.updateQuantity(newQuantity);
    }

    render() {
        return (
            <div className="beer" onClick={this.handleBeerClick}>
                <div className="beer-image-name">
                    <img src={this.props.image} alt='beer label' className="beer-label"/>
                    <h3>{this.props.name}</h3>
                </div>
                <p>{this.props.brewery}</p>
                <div className="rating-quantity-container">
                    <p>Untappd Rating: {this.props.rating}</p>
                    <div className="quantity-container">
                        <button className="minus-button" onClick={this.handleMinusClick}>-</button>
                        <p>{this.state.quantity}x</p>
                        <button className="plus-button" onClick={this.handlePlusClick}>+</button>
                    </div>
                </div>
                {this.state.isExpanded && <p>{this.props.description}</p>}
            </div>
        )
    }
}

export default Beer;