import React, {Component} from 'react';
import {render} from 'react-dom';
import update from 'immutability-helper';
import ReactDataGrid from 'react-data-grid';
import * as api from '../../lib/api';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this._cols = [{
            key: 'id',
            name: 'ID',
            width: 220
        }, {
            key: 'name',
            name: 'Category Name',
            width: 140,
            editable: true
        }, {
            key: 'imgUrl',
            name: 'Image URL',
            resizable: true,
            editable: true
        }];
        this.state = {rows: []};
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);

        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleDeleteRows = this.handleDeleteRows.bind(this);
        this.handleSaveRows = this.handleSaveRows.bind(this);
        this.handleFetchRows = this.handleFetchRows.bind(this);
    }

    componentDidMount() {
        this.handleFetchRows();
    }

    handleGridRowsUpdated({fromRow, toRow, updated}) {
        let rows = this.state.rows.slice();
        let i = fromRow;
        while (i <= toRow) {
            let rowToUpdate = rows[i];
            rows[i] = update(rowToUpdate, {$merge: updated});
            i++;
        }
        this.setState({rows});
    }

    handleRowSelect(row) {
        console.log(row);
    }

    handleAddRow() {
        let nextRow = {};
        this._cols.filter(col => col.key !== 'id').forEach(col => nextRow[col.key] = '');
        let rows = this.state.rows.slice();
        rows = update(rows, {$push: [nextRow]});
        this.setState({rows});
    }

    handleDeleteRows() {}

    handleSaveRows() {}

    handleFetchRows() {
        $.get(api.CATEGORY_API_FETCH, (rows) => this.setState({rows}));
    }

    render() {
        return (
            <div>
                <h1 className="h2">Category Management</h1><hr/>
                <p className="text-right text-info">Choose row(s) to persist to database by selecting checkboxes then clicking Save or Delete</p>
                <ReactDataGrid
                    columns={this._cols}
                    enableRowSelect={true}
                    minHeight={500}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                    onRowSelect={this.handleRowSelect}
                    rowGetter={(i) => this.state.rows[i]}
                    rowsCount={this.state.rows.length}/>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <input type="button" className="btn btn-outline-success mr-2" value="Create" onClick={this.handleAddRow}/>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group float-right">
                            <input type="button" className="btn btn-outline-primary mr-2" value="Save" onClick={this.handleSaveRows}/>
                            <input type="button" className="btn btn-outline-danger mr-2" value="Delete" onClick={this.handleDeleteRows}/>
                            <input type="button" className="btn btn-outline-warning" value="Reset" onClick={this.handleFetchRows}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<CategoryView/>, document.getElementById('wrap'));