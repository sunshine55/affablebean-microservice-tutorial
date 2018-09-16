import React, {Component} from 'react';
import {render} from 'react-dom';

class CategoryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Hello World</h1>);
    }
}

const rootEl = document.getElementById('container');
render(<CategoryView/>, rootEl);