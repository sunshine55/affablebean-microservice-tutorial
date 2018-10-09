import React, {Component} from 'react';
import {render} from 'react-dom';

class ItemView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="h2">Item Management</h1><hr/>
            </div>
        );
    }
}

render(<ItemView/>, document.getElementById('wrap'));