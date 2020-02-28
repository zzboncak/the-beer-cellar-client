import React from 'react';
import { Link } from 'react-router-dom';
import './main-page.css';
import Beer from '../beer/beer';
import TokenService from '../../services/token-service';
import config from '../../config';
import BeerContext from '../../BeerContext';

class MainPage extends React.Component {
    static contextType = BeerContext;

    componentDidMount = () => {        
        //If a user is logged in (i.e. has an auth token), the user's beers are fetched. If not, it's in demo mode and loads dummy data and runs in system memory.
        if(TokenService.hasAuthToken()) {
            fetch(`${config.API_ENDPOINT}/cellar`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                }
            })
                .then(res => {
                    if(!res.ok) {
                        throw new Error('Could not load your beers! Sorry man...');
                    }
                    return res.json();
                })
                .then(data => {
                    this.context.updateBeersInState(data);
                })
                .catch(err => console.log(err));
        }
    }

    handleLogout = (e) => {
        TokenService.clearAuthToken();
    } 

    handleBeerDelete = (inventory_id) => {
        let newState = this.context.beers.filter(beer => beer.inventory_id !== inventory_id);
        this.context.updateBeersInState(newState);
    }

    getTotalBeers = () => {
        let countArray = this.context.beers.map(beer => beer.quantity);
        let totalCount = countArray.reduce((a, b) => a + b, 0);
        return totalCount;
    }

    getAverageCellarRating = () => {
        let arrayOfAverages = this.context.beers.map(beer => beer.untappd_rating*beer.quantity)
        let totalScore = arrayOfAverages.reduce((a, b) => a + b, 0);
        let totalCount = this.getTotalBeers();
        return (totalScore/totalCount).toFixed(2);
    }

    getHighestRatedBeer = () => {
        let arrayCopy = this.context.beers.slice();
        let sortedArray = arrayCopy.sort((a, b) => a.untappd_rating - b.untappd_rating)
        let highestBeer = sortedArray.pop();
        return highestBeer;
    }


    getHighestCountBeer = () => {
        let arrayCopy = this.context.beers.slice();
        let sortedArray = arrayCopy.sort((a, b) => a.quantity - b.quantity);
        let mostCountedBeer = sortedArray.pop();
        return mostCountedBeer;
    }

    handleSort = (e) => {
        const sortOption = e.target.value;
        let keyName = '';

        //first set the keyName of the objects to sort on based on the sort option
        if (sortOption === "quantity-low" || sortOption === "quantity-high") {
            keyName = "quantity"; //sorting on quantity
        } else if (sortOption === "a-z" || sortOption === "z-a") {
            keyName = "beer_name"; //sorting on beer_name
        } else if (sortOption === "rating-high" || sortOption === "rating-low") {
            keyName = "untappd_rating"; //sorting on untappd_rating
        }

        //then sort accordingly
        if (sortOption === "quantity-low" || sortOption === "rating-low") {
            this.context.updateBeersInState(this.context.beers.sort((a, b) => a[keyName] - b[keyName]));
        } else if (sortOption === "quantity-high" || sortOption === "rating-high") {
            this.context.updateBeersInState(this.context.beers.sort((a, b) => b[keyName] - a[keyName]));
        } else if (sortOption === "a-z") { //sorting alpabetically
            this.context.updateBeersInState(this.context.beers.sort((a, b) => {
                let aName = a[keyName];
                let bName = b[keyName];
                if(aName < bName){
                    return -1;
                } else if (aName > bName) {
                    return 1;
                } else {
                    return 0
                }
            } 
            ));
        } else if (sortOption === "z-a") { //sorting reverse alphabetically
            this.context.updateBeersInState(this.context.beers.sort((a, b) => {
                let aName = a[keyName];
                let bName = b[keyName];
                if(aName > bName){
                    return -1;
                } else if (aName < bName) {
                    return 1;
                } else {
                    return 0
                }
            } 
            ));
        }
    }

    renderNavButtons = () => {
        if(TokenService.hasAuthToken()) {
            return (
                <Link to='/'>
                    <button 
                        id="logout-button"
                        onClick={this.handleLogout}
                    >
                        Logout
                    </button>
                </Link>
            )
        } else {
            return (
                <Link to='/'>
                    <button 
                        id="logout-button"
                        onClick={this.handleLogout}
                    >
                        End Demo
                    </button>
                </Link>
            )
        }
    }
    
    render() {
        let beers = this.context.beers.map((beer, i) => {
            return <Beer 
                        key={i}
                        index={i} //so the component knows which index it is in the main-page state
                        inventory={beer.inventory_id}
                        name={beer.beer_name} 
                        rating={beer.untappd_rating.toFixed(2)}
                        quantity={beer.quantity}
                        description={beer.beer_description}
                        brewery={beer.brewery_name}
                        image={beer.beer_image}
                        handleBeerDelete={this.handleBeerDelete}
                    />
        })

        let cellarCount = this.getTotalBeers();

        let cellarRating = this.getAverageCellarRating();

        let highestBeer = this.getHighestRatedBeer() || ' ';

        let mostBeer = this.getHighestCountBeer() || ' ';

        let navButtons = this.renderNavButtons();
        
        return (
            <div className='user-login-page'>
                {navButtons}
        
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
                    
                    <div className="sort-bar">
                        <label htmlFor="sort-options">Sort by: </label>
                        <select id="sort-options" name="sort-options" onChange={e => this.handleSort(e)}>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="quantity-high">Quantity (High - Low)</option>
                            <option value="quantity-low">Quantity (Low - High)</option>
                            <option value="rating-high">Rating (High - Low)</option>
                            <option value="rating-low">Rating (Low - High)</option>
                        </select>
                    </div>

                    <section className="beers-container">
                        {beers}
                    </section>

                    <Link to='/add-form'>
                        <button id="add-button">+</button>
                    </Link>
                </section>
            </div>
        )
    }
}

export default MainPage;