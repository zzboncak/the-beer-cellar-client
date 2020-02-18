import React from 'react';
import './beer.css';

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

    handleMinusClick = (e) => {
        e.stopPropagation();
        this.setState({ quantity: this.state.quantity - 1 });
    }

    handlePlusClick = (e) => {
        e.stopPropagation();
        this.setState({ quantity: this.state.quantity + 1 });
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