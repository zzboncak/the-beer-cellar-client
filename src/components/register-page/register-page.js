import React from 'react';
import { Link } from 'react-router-dom';
import './register-page.css';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

class RegisterPage extends React.Component {
    state = {
        username: '',
        user_password: '',
        password_confirm: '',
        password_touched: false,
        error: null
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onUserPasswordChange = (e) => {
        this.setState({
            user_password: e.target.value,
            password_touched: true
        })
    }

    onPasswordConfirmChange = (e) => {
        this.setState({
            password_confirm: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null });
        const { username, user_password } = this.state;
        const newUser = { username, user_password };

        AuthApiService.postUser(newUser)
            .then(res => {
                this.setState({
                    username: '',
                    user_password: '',
                    error: null
                });
                TokenService.saveAuthToken(res);
                this.props.history.push('/cellar')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    validateForm = () => {
        const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;
        
        if(this.state.user_password.length < 8) {
            return 'Password must be longer than 8 characters'
        } else if (this.state.user_password.length > 72) {
            return 'Password must be longer shorter than 72 characters'
        } else if (this.state.user_password.startsWith(' ') || this.state.user_password.endsWith(' ')) {
            return 'Passwords cannot start or end with a space'
        } else if (!REGEX_UPPER_LOWER_NUMBER.test(this.state.user_password)) {
            return 'Password must contain 1 upper case, lower case, and number'
        } else if (this.state.user_password !== this.state.password_confirm) {
            return 'Passwords must match'
        } else if (this.state.username === '') {
            return 'Please enter a username'
        } else {
            return null
        }
    }
    
    render() {
        let validateMessage = this.validateForm();
        let error = this.state.error;
        
        return (
            <div className='register-page'>
                <h2 className="page-title">Register</h2>

                <div className='error-message'>{this.state.error && error}</div>

                <form className="register-form" onSubmit={this.handleSubmit}>
                    <fieldset className="user-info">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <br/>
                        <input 
                            className="form-input"
                            name="username" 
                            type="text" 
                            placeholder="ex: Gandalf the Grey"
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
                        <br/>
                        <label htmlFor="password-confirm">
                            Confirm Password:
                        </label>
                        <br/>
                        <input 
                            className="form-input"
                            name="password-confirm" 
                            type="password" 
                            value={this.state.password_confirm}
                            onChange={this.onPasswordConfirmChange}
                        />

                        <div className="button-container">
                            <button className="register-form-button" type="submit" disabled={validateMessage}>Submit</button>
                            <Link to='/'>
                                <button className="register-form-button">Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>
                <p className='form-instructions'>Passwords should be between 8 and 72 characters and contain at least one uppercase letter, one lowercase letter, and one number</p>
            <p className='validate-message'>{this.state.password_touched && validateMessage}</p>
            </div>
        )
    }
}

export default RegisterPage;