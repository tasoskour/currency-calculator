import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Form from "./Form";
import CreateExchange from "./CreateExchange";

/* The main React component */
class Main extends Component {
    render() {
        return (

            <Router>
            <div>
              <Link to="/">Home</Link>
                <Route exact path="/" component={Form} />
                <Route exact path="/create" component={CreateExchange} />
                </div>
            </Router>

        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
