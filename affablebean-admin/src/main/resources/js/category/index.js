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
        this._rows = {};
        this.handleSaveCell = this.handleSaveCell.bind(this);
    }

    componentDidMount() {
        $.get(api.CATEGORY_API_FETCH, (data) => {
            data.forEach(datum => this._rows[datum.id] = datum);
            this.setState({data})
        });
    }

    handleSaveCell(oldValue, newValue, row, column) {
        this._rows[row.id][column.dataField] = newValue;
    }

    render() {
        const cellEdit = cellEditFactory({mode: 'click', blurToSave: true, afterSaveCell: this.handleSaveCell});
        return (
            <div>
                <h1 className="h2">Category Management</h1><hr/>
                <BootstrapTable
                    columns={this._cols} data={this.state.data} keyField='id'
                    hover={true} bootstrap4={true}
                    cellEdit={cellEdit}/>
            </div>
        );
    }
}

render(<CategoryView/>, document.getElementById('wrap'));