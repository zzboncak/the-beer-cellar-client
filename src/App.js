import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing-page/landing-page';
import LoginPage from './components/login-page/login-page';
import RegisterPage from './components/register-page/register-page';
import MainPage from './components/main-page/main-page';
import AddPage from './components/add-page/add-page';
import PublicOnlyRoute from './routes/PublicOnlyRoute';
import PrivateOnlyRoute from './routes/PrivateOnlyRoute';

class App extends React.Component {
  

  render() {
    return (
      <main className='App'>
        <Route exact path='/' component={LandingPage} />
        <PublicOnlyRoute exact path='/login' component={LoginPage} />
        <PublicOnlyRoute exact path='/register' component={RegisterPage} />
        <PrivateOnlyRoute exact path='/cellar' component={MainPage} />
        <Route exact path='/add-form' component={AddPage} />
      </main>
    );
  }
}

export default App;
