import React from 'react';
import { Link } from 'react-router-dom';
import './register-page.css';
import AuthApiService from '../../services/auth-api-service';

class RegisterPage extends React.Component {
    state = {
        username: '',
        user_password: '',
        error: null
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onUserPasswordChange = (e) => {
        this.setState({
            user_password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null });
        const { username, user_password } = this.state;
        const newUser = { username, user_password };

        AuthApiService.postUser(newUser)
            .then(user => {
                this.setState({
                    username: '',
                    user_password: '',
                    error: null
                });
                this.props.history.push('/login')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    render() {
        return (
            <div className='register-page'>
                <h2 className="page-title">Register</h2>

                <form className="register-form" onSubmit={this.handleSubmit}>
                    <fieldset className="user-info">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <br/>
                        <input 
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