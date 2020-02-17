import React from 'react';
import './beer.css';

class Beer extends React.Component {
    
    state = {
        isExpanded: false
    }

    handleBeerClick = (e) => {
        console.log(`You clicked beer with inventory ${this.props.inventory}`);
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        return (
            <div className="beer" onClick={this.handleBeerClick}>
                <div className="beer-overview">
                    <p>{this.props.name}</p>
                    <p>{this.props.rating}</p>
                    <p>{this.props.quantity}</p>
                </div>
                {this.state.isExpanded && <p>{this.props.description}</p>}
            </div>
        )
    }
}

export default Beer;