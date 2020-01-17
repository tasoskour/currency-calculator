import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import CreateButton from "./CreateButton";

/* The main React component */
class Main extends Component {
    render() {
        return (
            <div>
                <Form />
                <CreateButton/>
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
