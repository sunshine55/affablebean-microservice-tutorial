import React, {Component} from 'react';
import Category from '../containers/Category';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';

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