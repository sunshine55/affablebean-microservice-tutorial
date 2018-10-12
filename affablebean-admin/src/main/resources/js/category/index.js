import React, {Component} from 'react';
import {render} from 'react-dom';
import * as api from '../../lib/api';
import ReactTable from 'react-table';

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
        this.renderEditable = this.renderEditable.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
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

    renderColumns() {
        return [{
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
    }

    render() {
        return (
            <div>
                <h1 className="h2">Category Management</h1><hr/>
                <ReactTable
                    columns={this.renderColumns()} data={this.state.data}
                    defaultPageSize={10} className="-striped -highlight"/>
            </div>
        );
    }
}

$.get(api.CATEGORY_API_FETCH, (data) => render(<CategoryView data={data}/>, document.getElementById('wrap')));