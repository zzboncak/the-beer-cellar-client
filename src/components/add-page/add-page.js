import React from 'react';
import { Link } from 'react-router-dom';
import './add-page.css';

class AddPage extends React.Component {
    render() {
        return (
            <div className='add-page'>
                <h2 className="page-title">Add a beer</h2>

                <form className="add-form">
                    <fieldset className="beer-info">
                        <label htmlFor="username">
                            Search:
                        </label>
                        <br/>
                        <input name="username" type="search" placeholder="ex: Pliney the Elder" />

                        <div className="button-container">
                            <button type="submit">Let's Go</button>
                            <Link to='/cellar'>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </fieldset>
                </form>

                <section className="results-section">
                    <h3>Results</h3>
                    
                    <div className="beer">
                        <p>Beer 1</p>
                        <p>4.25</p>
                        <p>x10</p>
                        <button>Add to cellar</button>
                    </div>

                    <div className="beer">
                        <p>Beer 2</p>
                        <p>4.17</p>
                        <p>x7</p>
                        <button>Add to cellar</button>
                    </div>

                    <div className="beer">
                        <p>Beer 3</p>
                        <p>4.49</p>
                        <p>x4</p>
                        <button>Add to cellar</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default AddPage;