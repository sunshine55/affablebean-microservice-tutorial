import React, {Component} from 'react';
import {render} from 'react-dom';

class CategoryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1 className="h2">Category Management</h1>);
    }
}

render(<CategoryView/>, document.getElementById("wrap"));