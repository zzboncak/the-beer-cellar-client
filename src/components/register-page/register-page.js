import React from 'react';
import { Link } from 'react-router-dom';
import './register-page.css';

class RegisterPage extends React.Component {
    render() {
        return (
            <div className='register-page'>
                <h2 className="page-title">Register</h2>

                <form className="register-form">
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
                        <br/>
                        <label htmlFor="password-confirm">
                            Confirm Password:
                        </label>
                        <br/>
                        <input name="password-confirm" type="password" />

                        <div className="button-container">
                            <button type="submit">Submit</button>
                            <Link to='/'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default RegisterPage;