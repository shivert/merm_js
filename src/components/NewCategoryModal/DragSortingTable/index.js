import React from "react";
import { Button, Table, Icon, Input, Popconfirm } from "antd";
const Search = Input.Search;
import PropTypes from "prop-types";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";
import { connect } from "react-redux";

function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return "downward";
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return "upward";
  }
}

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      dragRow,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let className = restProps.className;
    if (isOver && initialClientOffset) {
      const direction = dragDirection(
        dragRow.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset
      );
      if (direction === "downward") {
        className += " drop-over-downward";
      }
      if (direction === "upward") {
        className += " drop-over-upward";
      }
    }

    const trProps = Object.assign({}, restProps);
    delete trProps.moveRow;

    return connectDragSource(
      connectDropTarget(
        <tr {...trProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset()
}))(
  DragSource("row", rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset()
  }))(BodyRow)
);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.toggleEdit();
    const values = {
      name: e.target.value
    };
    handleSave({ ...record, ...values });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, record, ...restProps } = this.props;

    const tdProps = Object.assign({}, restProps);
    delete tdProps.handleSave;

    return (
      <td ref={node => (this.cell = node)} {...tdProps}>
        {editable ? (
          editing ? (
            <Input defaultValue={record[dataIndex]} onPressEnter={this.save} />
          ) : (
            <div
              className="editable-cell-value-wrap"
              style={{ paddingRight: 24 }}
              onClick={this.toggleEdit}
            >
              {restProps.children}
            </div>
          )
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class DragSortingTable extends React.Component {
  state = {
    data: this.props.userCategory.data,
    newCategory: ""
  };

  columns = [
    {
      title: " ",
      dataIndex: "drag",
      key: "drag",
      width: 20,
      render: () => <Icon type="drag" />
    },
    {
      title: "Order",
      key: "order",
      render: (text, record, index) => index + 1
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true
    },
    {
      title: "",
      dataIndex: "operation",
      render: (text, record) =>
        this.state.data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(record.key)}
          >
            <a href="javascript:;">
              <Button shape="circle" icon="delete" />
            </a>
          </Popconfirm>
        ) : null
    }
  ];

  components = {
    body: {
      row: DragableBodyRow,
      cell: EditableCell
    }
  };

  updateParentState = () => {
    this.props.onChange(this.state.data);
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    const dataNew = {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
    };

    this.setState(
      update(this.state, {
        data: dataNew
      }),
      this.updateParentState
    );
  };

  handleDelete = key => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
  };

  handleSave = row => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ data: newData });
  };

  onChange = e => {
    this.setState({ newCategory: e.target.value });
  };

  render() {
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });

    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        rowClassName={() => "editable-row"}
        pagination={false}
        footer={() => (
          <div style={{ margin: "0 auto" }}>
            <Search
              className="add-new-category-field"
              placeholder="New Category Name"
              value={this.state.newCategory}
              onChange={this.onChange}
              onSearch={value => {
                const updatedState = [
                  ...this.state.data,
                  {
                    key: value,
                    name: value
                  }
                ];

                this.setState({ newCategory: "" });
                this.setState({ data: updatedState }, this.updateParentState);
              }}
              enterButton="Add"
            />
          </div>
        )}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
      />
    );
  }
}

DragSortingTable.propTypes = {
  onChange: PropTypes.func.isRequired,
  userCategory: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userCategory: state.userCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(DragSortingTable));
