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
    // makeBeers() {
    //     let beers = [
    //         {
    //             name: 'Beer 1',
    //             rating: 4.25,
    //             quantity: 10
    //         },
    //         {
    //             name: 'Beer 2',
    //             rating: 4.17,
    //             quantity: 7
    //         },
    //         {
    //             name: 'Beer 3',
    //             rating: 4.49,
    //             quantity: 4
    //         }
    //     ];

    //     return beers.map((beer, i) => 
    //         <Beer 
    //             key={i}    
    //             name={beer.name}
    //             rating={beer.rating}
    //             quantity={beer.quantity}
    //         />);
    // }

    componentDidMount = () => {
        fetch(`${config.LOCAL_API_ENDPOINT}/cellar`, {
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
                console.log(data);
                this.setState({ beers: data });
            })
            .catch(err => console.log(err))
    }

    handleLogout = (e) => {
        TokenService.clearAuthToken();
    } 
    
    render() {
        let beers = this.state.beers.map((beer, i) => {
            return <Beer 
                    key={i} 
                    name={beer.beer_name} 
                    rating={beer.untappd_rating}
                    quantity={beer.quantity}
                    />
        })
        
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
                        <p>27</p>
                    </div>

                    <div className="dash-item">
                        <h3>Average Untappd Rating</h3>
                        <p>4.37</p>
                    </div>

                    <div className="dash-item">
                        <h3>Highest Ranked Beer</h3>
                        <p>Bourbon County 2015</p>
                    </div>

                    <div className="dash-item">
                        <h3>Highest Count</h3>
                        <p>Bourbon County 2019</p>
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