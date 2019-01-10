import React, {Component} from 'react';
import * as api from '../lib/api';
import ReactTable from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';

const CheckboxTable = checkboxHOC(ReactTable);

const CategorySelectBox = ({categories, selectedCategory, onChange}) => {
    if (!categories) {
        return null;
    }
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
            categories: null,
            selectedCategory: null,
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
        const _this = this;
        api.get(api.CATEGORY_FETCH_URI, (categories) => {
            api.get(`${api.ITEM_FETCH_URI}/${categories[0].id}`, (data) => _this.setState({
                categories: categories,
                selectedCategory: categories[0].id,
                data: getData(data)
            }));
        });
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
        api.get(`${api.ITEM_FETCH_URI}/${selectedCategory}`, (data) => this.setState({data: getData(data), selectedCategory: selectedCategory}));
    }

    handleReset() {
        api.get(`${api.ITEM_FETCH_URI}/${this.state.selectedCategory}`, (data) => this.setState({data: getData(data)}));
    }

    handleCreate() {
        let datum = {};
        datum._id = this.state.data.length;
        this.state.columns.forEach(col => datum[col.accessor] = '');
        const data = [...this.state.data, datum];
        this.setState({data});
    }

    handleSave() {
        api.post(`${api.ITEM_BULK_UPSERT_URI}/${this.state.selectedCategory}`, this.state.data, (data) => this.setState({data: getData(data)}));
    }

    handleDelete() {
        if (this.state.selection.length !== 0) {
            let deletedRows = [];
            this.state.selection.forEach(_id => {
                const deletedRow = this.state.data.filter(datum => datum._id === _id)[0];
                deletedRows.push(deletedRow);
            });
            api.post(`${api.ITEM_BULK_DELETE_URI}/${this.state.selectedCategory}`, deletedRows, (data) => this.setState({data: getData(data)}));
        }
    }

    render() {
        const {toggleSelection, toggleAll, isSelected} = this;
        const {data, columns, selectAll} = this.state;

        const checkboxProps = {selectAll, isSelected, toggleSelection, toggleAll, selectType: 'checkbox'};
        const categoryProps = {categories: this.state.categories, selectedCategory: this.state.selectedCategory, onChange: this.handleCategoryChange};

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

export default ItemView;