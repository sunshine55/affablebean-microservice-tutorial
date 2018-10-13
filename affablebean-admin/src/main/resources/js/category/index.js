import React, {Component} from 'react';
import {render} from 'react-dom';
import * as api from '../../lib/api';
import ReactTable from 'react-table';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
        this.renderEditable = this.renderEditable.bind(this);
        this._cols = [{
            accessor: 'id',
            Header: 'ID'
        }, {
            accessor: 'name',
            Header: 'Category Name',
            Cell: this.renderEditable
        }, {
            accessor: 'imgUrl',
            Header: 'Image URL',
            Cell: this.renderEditable
        }];
        this.handleReset = this.handleReset.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    renderEditable(cellInfo) {
        const onBlur = (e) => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({data});
        };
        return (
            <div
                style={{backgroundColor: '#fafafa'}}
                contentEditable
                suppressContentEditableWarning
                onBlur={onBlur}
                dangerouslySetInnerHTML={{__html: this.state.data[cellInfo.index][cellInfo.column.id]}}
            />
        );
    }

    handleReset() {
        $.get(api.CATEGORY_API_FETCH, (data) => this.setState({data}));
    }

    handleCreate() {
        let datum = {};
        this._cols.forEach(col => datum[col.accessor] = '');
        const data = [...this.state.data, datum];
        this.setState({data});
    }

    handleSave() {
        api.post(api.CATEGORY_API_BULK_UPSERT, this.state.data, (data) => this.setState({data}));
    }

    render() {
        return (
            <div>
                <h1 className="h2">Category Management</h1><hr/>
                <ReactTable
                    columns={this._cols} data={this.state.data}
                    defaultPageSize={10} className="-striped -highlight"
                />
                <div className="row mt-2">
                    <div className="col-md-6">
                        <input type="button" className="btn btn-outline-success mr-2" value="Create" onClick={this.handleCreate}/>
                        <input type="button" className="btn btn-outline-danger" value="Delete"/>
                    </div>
                    <div className="col-md-6">
                        <div className="float-right">
                            <input type="button" className="btn btn-outline-primary mr-2" value="Save" onClick={this.handleSave}/>
                            <input type="button" className="btn btn-outline-warning" value="Reset" onClick={this.handleReset}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

$.get(api.CATEGORY_API_FETCH, (data) => render(<CategoryView data={data}/>, document.getElementById('wrap')));