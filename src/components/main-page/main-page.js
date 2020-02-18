import React from 'react';
import { Link } from 'react-router-dom';
import './main-page.css';
import Beer from '../beer/beer';
import TokenService from '../../services/token-service';
import config from '../../config';

class MainPage extends React.Component {
    
    state = {
        beers: []
    }

    componentDidMount = () => {
        fetch(`${config.getEndpoint()}/cellar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('Could not load your beers! Sorry man...')
                }
                return res.json()
            })
            .then(data => {
                this.setState({ beers: data });
            })
            .catch(err => console.log(err))
    }

    handleLogout = (e) => {
        TokenService.clearAuthToken();
    } 

    getTotalBeers = () => {
        let countArray = this.state.beers.map(beer => beer.quantity);
        let totalCount = countArray.reduce((a, b) => a + b, 0);
        return totalCount
    }

    getAverageCellarRating = () => {
        let arrayOfAverages = this.state.beers.map(beer => beer.untappd_rating*beer.quantity)
        let totalScore = arrayOfAverages.reduce((a, b) => a + b, 0);
        let totalCount = this.getTotalBeers();
        return (totalScore/totalCount).toFixed(2);
    }

    getHighestRatedBeer = () => {
        let arrayCopy = this.state.beers.slice();
        let sortedArray = arrayCopy.sort((a, b) => a.untappd_rating - b.untappd_rating)
        let highestBeer = sortedArray.pop();
        return highestBeer;
    }


    getHighestCountBeer = () => {
        let arrayCopy = this.state.beers.slice();
        let sortedArray = arrayCopy.sort((a, b) => a.quantity - b.quantity);
        let mostCountedBeer = sortedArray.pop();
        return mostCountedBeer;
    }
    
    render() {
        let beers = this.state.beers.map((beer, i) => {
            return <Beer 
                        key={i} 
                        inventory={beer.inventory_id}
                        name={beer.beer_name} 
                        rating={beer.untappd_rating.toFixed(2)}
                        quantity={beer.quantity}
                        description={beer.beer_description}
                        brewery={beer.brewery_name}
                        image={beer.beer_image}
                    />
        })

        let cellarCount = this.getTotalBeers();

        let cellarRating = this.getAverageCellarRating();

        let highestBeer = this.getHighestRatedBeer() || ' ';

        let mostBeer = this.getHighestCountBeer() || ' ';
        
        return (
            <div className='user-login-page'>
                <Link to='/'>
                    <button 
                        className="logout-button"
                        onClick={this.handleLogout}
                    >
                        Logout
                    </button>
                </Link>
        
                <h1 className="hero-title">My Cellar</h1>

                <section className="cellar-dashboard">
                    <div className="dash-item">
                        <h3>Total Beers</h3>
                        <p>{cellarCount}</p>
                    </div>

                    <div className="dash-item">
                        <h3>Average Untappd Rating</h3>
                        <p>{cellarRating}</p>
                    </div>

                    <div className="dash-item">
                        <h3>Highest Ranked Beer</h3>
                        <p>{highestBeer.beer_name}</p>
                    </div>

                    <div className="dash-item">
                        <h3>Highest Count</h3>
                        <p>{mostBeer.beer_name}</p>
                    </div>
                </section>

                <section className="cellar">
                    
                    <h2>Beers</h2>
                    
                    <div className="sort-bar">
                        <label htmlFor="sort-options">Sort by</label>
                        <select name="sort-options">
                            <option>Quantity</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                            <option>Rating (High - Low)</option>
                            <option>Rating (Low - High)</option>
                            <option>Date ascending</option>
                            <option>Date descending</option>
                        </select>
                    </div>

                    <section className="beers-container">
                        {beers}
                    </section>

                    <Link to='/add-form'>
                        <button className="add-button">Add a beer</button>
                    </Link>
                </section>
            </div>
        )
    }
}

export default MainPage;