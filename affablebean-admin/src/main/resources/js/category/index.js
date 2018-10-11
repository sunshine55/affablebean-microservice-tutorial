import React, {Component} from 'react';
import {render} from 'react-dom';
import * as api from '../../lib/api';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this._cols = [{
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'name',
            text: 'Category Name'
        }, {
            dataField: 'imgUrl',
            text: 'Image URL'
        }];
        this.state = {data: []};
    }

    componentDidMount() {
        $.get(api.CATEGORY_API_FETCH, (data) => this.setState({data}));
    }

    render() {
        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true

        });
        return (
            <div>
                <h1 className="h2">Category Management</h1><hr/>
                <BootstrapTable columns={this._cols} data={this.state.data} bootstrap4={true} keyField='id' cellEdit={cellEdit} hover={true}/>
            </div>
        );
    }
}

render(<CategoryView/>, document.getElementById('wrap'));