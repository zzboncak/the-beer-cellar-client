import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './add-page.css';
import BeerResult from '../beerResult/beerResult';

class AddPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userSearch: '',
            beersFromSearch: []
        };
    }

    onSearchChange = (e) => {
        this.setState({
            userSearch: e.target.value
        });
    }

    handleAddFormSubmit = (e) => {
        e.preventDefault();
        let searchTerm = this.state.userSearch.replace(/ /g, '+');
        let url = `${config.API_ENDPOINT}/search/${searchTerm}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userSearch: '',
                    beersFromSearch: data.response.beers.items
                });
            })
    }

    renderSearchResults() {
        if (this.state.beersFromSearch === []) {
            return <div className="results-section">Beers will appear below from your search</div>
        } else {
            return this.state.beersFromSearch.map((item, i) => 
                <BeerResult 
                    key={i}    
                    bid={item.beer.bid}
                    beer_name={item.beer.beer_name}
                    beer_description={item.beer.beer_description}
                    beer_label={item.beer.beer_label}
                    history={this.props.history}
                />)
        }
    }
    
    render() {
        let searchResults = this.renderSearchResults();
        
        return (
            <div className='add-page'>
                <h2 className="page-title">Add a beer</h2>

                <form className="add-form" onSubmit={this.handleAddFormSubmit}>
                    <fieldset className="beer-info">
                        <label htmlFor="username">
                            Search:
                        </label>
                        <br/>
                        <input 
                            name="username" 
                            type="search" 
                            placeholder="ex: Pliny the Elder"
                            value={this.state.userSearch}
                            onChange={this.onSearchChange} 
                        />

                        <div className="button-container">
                            <button className="add-page-button" type="submit">Let's Go</button>
                            <Link to='/cellar'>
                                <button className="add-page-button">Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>

                <section className="results-section">
                    {searchResults}             
                </section>
            </div>
        )
    }
}

export default AddPage;