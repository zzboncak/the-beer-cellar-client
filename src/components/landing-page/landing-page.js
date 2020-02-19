import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

class LandingPage extends React.Component {
    render() {
        console.log(process.env)
        return(
            <div>
                <nav className="nav">
                    <Link to='/cellar'>
                        <button className="demo-button">Demo</button>
                    </Link>

                    <div className="auth-buttons">
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                        {' '}
                        <Link to='register'>
                            <button>Register</button>
                        </Link>
                    </div>
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