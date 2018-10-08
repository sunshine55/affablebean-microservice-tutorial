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
        this._selRows = [];
        this.state = {rows: []};
        this.handleRowGetter = this.handleRowGetter.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);

        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleSyncRows = this.handleSyncRows.bind(this);
        this.handleFetchRows = this.handleFetchRows.bind(this);
    }

    componentDidMount() {
        this.handleFetchRows();
    }

    handleRowGetter(index) {
        return (0 <= index < this.state.rows.length) ? this.state.rows[index] : undefined;
    }

    handleRowSelect(rows) {
        this._selRows = rows;
    }

    handleGridRowsUpdated({fromRow, toRow, updated}) {
        let rows = this.state.rows.slice();
        let i = fromRow;
        while (i <= toRow) {
            rows[i] = update(this.state.rows[i], {$merge: updated});
            i++;
        }
        this.setState({rows});
    }

    handleAddRow() {
        let nextRow = {};
        this._cols.forEach(col => nextRow[col.key] = '');
        const rows = update(this.state.rows, {$push: [nextRow]});
        this.setState({rows});
    }

    handleSyncRows(e) {
        if (this._selRows.length > 0) {
            const url = (e.target.name === 'upsert' ? api.CATEGORY_API_BULK_UPSERT : api.CATEGORY_API_BULK_DELETE);
            api.post(url, this._selRows, (rows) => {
                if (rows.length > 0) {
                    this._selRows = [];
                    this.setState({rows});
                }
            });
        }
    }

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
                    enableCellSelect={true}
                    enableRowSelect={true}
                    minHeight={500}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                    onRowSelect={this.handleRowSelect}
                    rowGetter={this.handleRowGetter}
                    rowsCount={this.state.rows.length}/>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <input type="button" className="btn btn-outline-success mr-2" value="Create" onClick={this.handleAddRow}/>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group float-right">
                            <input type="button" className="btn btn-outline-primary mr-2" name="upsert" value="Save" onClick={this.handleSyncRows}/>
                            <input type="button" className="btn btn-outline-danger mr-2"  name="delete" value="Delete" onClick={this.handleSyncRows}/>
                            <input type="button" className="btn btn-outline-warning" value="Reset" onClick={this.handleFetchRows}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<CategoryView/>, document.getElementById('wrap'));