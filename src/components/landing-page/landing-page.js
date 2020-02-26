import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';
import TokenService from '../../services/token-service';
import demoData from '../../demo';
import BeerContext from '../../BeerContext';

class LandingPage extends React.Component {
    static contextType = BeerContext;


    componentDidMount = () => {        
        let userToken = TokenService.hasAuthToken(); //userToken is a boolean, true if an Auth Token exists, false if it doesn't
    
        //The app starts out loading dummy data. If demo mode is entered, this is the starting point.
        //When mounted, the main-page component loads a specific user's beers (if a user is logged in) and overwrites this data.
        if(!userToken) {
            this.context.updateBeersInState(demoData);
        }
    }

    renderAuthButtons = () => {
        if(TokenService.hasAuthToken()) {
            return (
                <div className="auth-buttons">
                    <Link to='/cellar'>
                        <button className="auth-button">Go to cellar</button>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="auth-buttons">
                    <Link to='/login'>
                        <button className="auth-button">Login</button>
                    </Link>
                    {' '}
                    <Link to='/register'>
                        <button className="auth-button">Register</button>
                    </Link>
                </div>
            )
        }
    }
    
    render() {
        let authButtons = this.renderAuthButtons();
        return(
            <div>
                <nav className="nav">
                    <Link to='/cellar'>
                        <button className="demo-button">Demo</button>
                    </Link>

                    {authButtons}
                </nav>

                <main>
                    <h1 className="hero-header">The Beer Cellar</h1>
                    <p className="app-description">A place to keep track of your carefully curated craft beers</p>
                </main>
        
            </div>
        )
    }
}

export default LandingPage;