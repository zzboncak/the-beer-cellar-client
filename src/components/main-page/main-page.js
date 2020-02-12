import React from 'react';
import { Link } from 'react-router-dom';
import './main-page.css';

class MainPage extends React.Component {
    render() {
        return (
            <div className='user-login-page'>
                <Link to='/'>
                    <button className="logout-button">Logout</button>
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
                        <div className="beer">
                            <p>Beer 1</p>
                            <p>4.25</p>
                            <p>x10</p>
                        </div>

                        <div className="beer">
                            <p>Beer 2</p>
                            <p>4.17</p>
                            <p>x7</p>
                        </div>

                        <div className="beer">
                            <p>Beer 3</p>
                            <p>4.49</p>
                            <p>x4</p>
                        </div>
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