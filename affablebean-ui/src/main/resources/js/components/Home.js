import React, {Component} from 'react';
import Category from '../containers/Category';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Jumbotron/>
                <Category/>
            </div>
        );
    }
}

export default Home;