import React, {Component} from 'react';
import {render} from 'react-dom';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        $.get('/category/fetch', (data) => this.setState({data: data}));
    }

    render() {
        let cols = [];
        this.state.data.forEach(datum => {
            cols.push(
                <div className="col-md-3">
                    <div className="card md-3 box-shadow">
                        <img className="card-img-top" src={datum.imgUrl}/>
                        <div className="card-body">
                            <h4>{datum.name}</h4>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {cols}
                    </div>
                </div>
            </div>
        );
    }
}

const rootEl = document.getElementById('mainDiv');
render(<CategoryView/>, rootEl);