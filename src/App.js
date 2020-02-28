import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing-page/landing-page';
import LoginPage from './components/login-page/login-page';
import RegisterPage from './components/register-page/register-page';
import MainPage from './components/main-page/main-page';
import AddPage from './components/add-page/add-page';
import PublicOnlyRoute from './routes/PublicOnlyRoute';
import BeerContext from './BeerContext';

class App extends React.Component {
  	static contextType = BeerContext;

	state = {
		beers: []
	}

	updateBeersInState = (newBeers) => {
		this.setState({ beers: newBeers });
	}

	updateSingleBeerInState = (index, updateField, updateValue) => {
		let beer = this.state.beers[index];
		beer[updateField] = updateValue;
		let currentState = this.state.beers.slice();
		currentState[index] = beer;
		this.setState({ beers: currentState });
	}

	render() {
		const contextValue = {
		beers: this.state.beers,
		updateBeersInState: this.updateBeersInState,
		updateSingleBeerInState: this.updateSingleBeerInState,
		}

		return (
		<BeerContext.Provider value={contextValue}>
			<main className='App'>
				<Route exact path='/' component={LandingPage} />
				<PublicOnlyRoute exact path='/login' component={LoginPage} />
				<PublicOnlyRoute exact path='/register' component={RegisterPage} />
				<Route exact path='/cellar' component={MainPage} />
				<Route exact path='/add-form' component={AddPage} />
			</main>
		</BeerContext.Provider>
		);
	}
}

export default App;
