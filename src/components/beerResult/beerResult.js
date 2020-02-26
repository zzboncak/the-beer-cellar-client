import React from 'react';
import './beerResult.css';
import config from '../../config';
import TokenService from '../../services/token-service';
import BeerContext from '../../BeerContext';

class BeerResult extends React.Component {
    static contextType = BeerContext;

    handleAdd = (e) => {
        e.preventDefault();
        let userToken = TokenService.hasAuthToken();

        if(userToken) {
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
        } else {
            let inventory_id = this.context.beers[this.context.beers.length - 1].inventory_id + 1;
            let newBeers = [
                ...this.context.beers, 
                {
                    beer_name: this.props.beer_name,
                    beer_image: this.props.beer_label,
                    beer_description: this.props.beer_description,
                    brewery_name: this.props.brewery_name,
                    bid: this.props.bid,
                    inventory_id: inventory_id,
                    untappd_rating: Math.random()*5, //specific Untappd rating info not available in demo mode
                    quantity: 1
                }
            ];
            this.context.updateBeersInState(newBeers);
            this.props.history.push('/cellar');
        }
    }

    render() {
        return (
            <div className="beer-result">
                <div className="beer-image-name">
                    <img src={this.props.beer_label} alt='A beer label' />
                    <h3 className="beer-name">{this.props.beer_name}</h3>
                </div>
                <p className="beer-description">{this.props.beer_description}</p>
                <button id="add-cellar" onClick={this.handleAdd}>Add to my cellar</button>
            </div>
        )
    }
}

export default BeerResult;