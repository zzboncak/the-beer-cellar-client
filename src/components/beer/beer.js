import React from 'react';
import './beer.css';

class Beer extends React.Component {
    render() {
        return (
            <div className="beer">
                <p>{this.props.name}</p>
                <p>{this.props.rating}</p>
                <p>{this.props.quantity}</p>
            </div>
        )
    }
}

export default Beer;