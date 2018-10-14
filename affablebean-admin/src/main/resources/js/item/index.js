import React, {Component} from 'react';
import {render} from 'react-dom';
import * as api from '../../lib/api';
import ReactTable from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';

const CheckboxTable = checkboxHOC(ReactTable);

const CategorySelectBox = ({categories, selectedCategory, onChange}) => {
    const options = categories.map(datum => (<option key={datum.id} value={datum.id}>{datum.name}</option>));
    return (<select className="form-control" onChange={onChange} value={selectedCategory}>{options}</select>);
};

function getData(data) {
    let nextData = [];
    data.forEach((datum, idx) => {
        let item = Object.assign({}, datum, {_id: idx});
        nextData.push(item);
    });
    return nextData;
}

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.renderEditable = this.renderEditable.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.state = {
            columns: [{
                accessor: 'id',
                Header: 'ID'
            }, {
                accessor: 'name',
                Header: 'Item Name',
                Cell: this.renderEditable
            }, {
                accessor: 'price',
                Header: 'Price',
                Cell: this.renderEditable
            }, {
                accessor: 'imgUrl',
                Header: 'Image URL',
                Cell: this.renderEditable
            }],
            data: [],
            selectedCategory: this.props.categories[0].id,
            selection: [],
            selectAll: false
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.handleReset();
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

    toggleSelection(key, shift, row) {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
            selection = [...selection.slice(0, keyIndex), ...selection.slice(keyIndex + 1)];
        } else {
            selection.push(key);
        }
        this.setState({selection});
    }

    toggleAll() {
        const selectAll = !this.state.selectAll;
        let selection = [];
        if (selectAll) {
            const wrappedInstance = this.checkboxTable.getWrappedInstance();
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            currentRecords.forEach(item => selection.push(item._original._id));
        }
        this.setState({selectAll, selection});
    }

    isSelected(key) {
        return this.state.selection.includes(key);
    }

    handleCategoryChange(e) {
        const selectedCategory = e.target.value;
        $.get(`${api.ITEM_API_FETCH}/${selectedCategory}`, (data) => this.setState({data: getData(data), selectedCategory: selectedCategory}));
    }

    handleReset() {
        $.get(`${api.ITEM_API_FETCH}/${this.state.selectedCategory}`, (data) => this.setState({data: getData(data)}));
    }

    handleCreate() {
        let datum = {};
        datum._id = this.state.data.length;
        this.state.columns.forEach(col => datum[col.accessor] = '');
        const data = [...this.state.data, datum];
        this.setState({data});
    }

    handleSave() {
        api.post(`${api.ITEM_API_BULK_UPSERT}/${this.state.selectedCategory}`, this.state.data, (data) => this.setState({data: getData(data)}));
    }

    handleDelete() {
        if (this.state.selection.length !== 0) {
            let deletedRows = [];
            this.state.selection.forEach(_id => {
                const deletedRow = this.state.data.filter(datum => datum._id === _id)[0];
                deletedRows.push(deletedRow);
            });
            api.post(`${api.ITEM_API_BULK_DELETE}/${this.state.selectedCategory}`, deletedRows, (data) => this.setState({data: getData(data)}));
        }
    }

    render() {
        const {toggleSelection, toggleAll, isSelected} = this;
        const {data, columns, selectAll} = this.state;

        const checkboxProps = {selectAll, isSelected, toggleSelection, toggleAll, selectType: 'checkbox'};
        const categoryProps = {categories: this.props.categories, selectedCategory: this.state.selectedCategory, onChange: this.handleCategoryChange};

        return (
            <div>
                <h1 className="h2">Item Management</h1><hr/>
                <div className="row mb-2">
                    <div className="col-md-3 offset-9">
                        <CategorySelectBox {...categoryProps}/>
                    </div>
                </div>
                <CheckboxTable
                    ref={r => this.checkboxTable = r}
                    columns={columns} data={data} {...checkboxProps}
                    defaultPageSize={10} className="-striped -highlight"
                />
                <div className="row mt-2">
                    <div className="col-md-6">
                        <input type="button" className="btn btn-outline-success mr-2" value="Create" onClick={this.handleCreate}/>
                        <input type="button" className="btn btn-outline-danger" value="Delete" onClick={this.handleDelete}/>
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

$.get(api.CATEGORY_API_FETCH, (categories) => render(<ItemView categories={categories}/>, document.getElementById('wrap')));