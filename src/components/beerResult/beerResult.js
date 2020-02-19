import React from 'react';
import './beerResult.css';
import config from '../../config';
import TokenService from '../../services/token-service';

class BeerResult extends React.Component {
    
    handleAdd = (e) => {
        e.preventDefault();
        console.log(`You tried to add a beer with id ${this.props.bid}`);
        let url = `${config.API_ENDPOINT}/cellar/${this.props.bid}`;
        let options = {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        }
        fetch(url, options)
            .then(res => this.props.history.push('/cellar'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="beer-result">
                <h3 className="beer-name">{this.props.beer_name}</h3>
                <p className="beer-description">{this.props.beer_description}</p>
                <img src={this.props.beer_label} alt='A beer label' />
                <button className="add-button" onClick={this.handleAdd}>Add to my cellar</button>
            </div>
        )
    }
}

export default BeerResult;