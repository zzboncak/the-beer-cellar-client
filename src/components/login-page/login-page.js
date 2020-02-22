import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './login-page.css';

class LoginPage extends React.Component {
    
    state = {
        username: '',
        user_password: '',
        form_touched: false,
        error: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null })

        const { username, user_password } = this.state;

        AuthApiService.postLogin({
            username: username,
            user_password: user_password
        })
            .then(res => {
                this.setState({
                    username: '',
                    user_password: ''
                });
                TokenService.saveAuthToken(res.authToken);
                this.props.history.push('/cellar');
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
            form_touched: true
        })
    }

    onUserPasswordChange = (e) => {
        this.setState({
            user_password: e.target.value,
            form_touched: true
        })
    }

    validateForm = () => {
        if(this.state.username === '') {
            return 'Please enter a username'
        } else if (this.state.user_password === '') {
            return 'Please enter a password'
        } else {
            return null
        }
    }

    render() {
        const errorMessage = this.state.error;
        const validateMessage = this.validateForm();

        return(
            <div className='login-page'>
                <h2 className="page-title">Log in</h2>

                {errorMessage && <p className='alert'>{errorMessage}</p>}
            
                <form className="login-form" onSubmit={this.handleSubmit}>
                    
                    
                    <fieldset className="user-info">
                    <p className='validate-message'>{this.state.form_touched && validateMessage}</p>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <br/>
                        <input 
                            className="form-input"
                            name="username" 
                            type="text" 
                            placeholder="ex: GandalfTheGrey" 
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                        />
                        <br/>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <br/>
                        <input 
                            className="form-input"
                            name="password" 
                            type="password" 
                            value={this.state.user_password}
                            onChange={this.onUserPasswordChange}
                        />

                        <div className="button-container">
                            <button 
                                type="submit" 
                                id="submit-button"
                                disabled={validateMessage}
                            >
                                Let's Go
                            </button>
                            <Link to='/'>
                                <button id="cancel-button">Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>

                <section className="register">
                    <p>Don't have an account yet?</p>
                    <Link to='register'>
                        <button id="register-button">Register</button>
                    </Link>
                </section>
            </div>
        )
    }
}

export default LoginPage;