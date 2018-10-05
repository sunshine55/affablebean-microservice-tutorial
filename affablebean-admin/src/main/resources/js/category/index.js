import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactDataGrid from 'react-data-grid';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this._cols = [{
            key: 'id',
            name: 'ID',
            resizable: true
        }, {
            key: 'name',
            name: 'Category Name',
            resizable: true
        }, {
            key: 'imgUrl',
            name: 'Image URL',
            resizable: true
        }];
        this.state = {rows: []};

        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
    }

    componentDidMount() {
        $.get('/ws/category/fetch', (data) => {
            this.setState({rows: data});
        });
    }

    handleGridRowsUpdated(fromRow, toRow, updated) {

    }

    render() {
        return (
            <div>
                <h1 className="h2">Category Management</h1>
                <ReactDataGrid
                    columns={this._cols}
                    rowGetter={(i) => this.state.rows[i]}
                    rowsCount={this.state.rows.length}
                    minHeight={500}/>
            </div>
        );
    }
}

render(<CategoryView/>, document.getElementById('wrap'));