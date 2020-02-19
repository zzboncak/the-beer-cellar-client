import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';
import TokenService from '../../services/token-service';

class LandingPage extends React.Component {
    
    renderAuthButtons = () => {
        if(TokenService.getAuthToken()) {
            return (
                <div className="auth-buttons">
                    <Link to='/cellar'>
                        <button>See my cellar</button>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="auth-buttons">
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                    {' '}
                    <Link to='/register'>
                        <button>Register</button>
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
                    <h1 className="hero-header">Beer Cellar</h1>
                    <p className="app-description">A place to keep track of your carefully curated craft beers</p>
                </main>
        
            </div>
        )
    }
}

export default LandingPage;