import React from 'react';
import { Link } from 'react-router-dom';
import './login-page.css';

class LoginPage extends React.Component {
    render() {
        return(
            <div className='login-page'>
                <h2 className="page-title">Log in</h2>

                <form className="login-form">
                    <fieldset className="user-info">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <br/>
                        <input name="username" type="text" placeholder="ex: Gandalf the Grey" />
                        <br/>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <br/>
                        <input name="password" type="password" />

                        <div className="button-container">
                            <button type="submit">Let's Go</button>
                            <Link to='/'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>

                <section className="register">
                    <p>Don't have an account yet?</p>
                    <Link to='register'>
                        <button>Register</button>
                    </Link>
                </section>
            </div>
        )
    }
}

export default LoginPage;