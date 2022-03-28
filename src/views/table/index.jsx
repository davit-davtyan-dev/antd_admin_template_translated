import React, { Component } from "react";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { tableList, deleteItem,editItem } from "@/api/table";
import EditForm from "./forms/editForm"
const { Column } = Table;
const { Panel } = Collapse;
class TableComponent extends Component {
  _isMounted = false; // This variable is used to mark whether the current component is mounted.
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: "",
      star: "",
      status:""
    },
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      author: "",
      date: "",
      readings: 0,
      star: "★",
      status: "published",
      title: ""
    }
  };
  fetchData = () => {
    this.setState({ loading: true });
    tableList(this.state.listQuery).then((response) => {
      this.setState({ loading: false });
      const list = response.data.data.items;
      const total = response.data.data.total;
      if (this._isMounted) {
        this.setState({ list, total });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        title:value,
      }
    }));
  };
  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status:value,
      }
    }));
  };
  filterStarChange  = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        star:value,
      }
    }));
  };
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  handleDelete = (row) => {
    deleteItem({id:row.id}).then(res => {
      message.success("successfully deleted")
      this.fetchData();
    })
  }
  handleEdit = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleOk = _ => {
    const { formRef } = this;
    formRef.current.validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          star: "".padStart(fieldsValue["star"], "★"),
          date: fieldsValue["date"].format("YYYY-MM-DD HH:mm:ss"),
        };
        this.setState({ editModalLoading: true });
        editItem(values)
          .then((response) => {
            formRef.current.resetFields();
            this.setState({ editModalVisible: false, editModalLoading: false });
            message.success("Edited success!");
            this.fetchData();
          })
          .catch((e) => {
            message.success("Editing fails, please try again!");
          });
      })
      .catch(({ errorFields }) => {
        formRef.current.scrollToField(errorFields?.[0]?.name);
      });
  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="filter" key="1">
            <Form layout="inline">
              <Form.Item label="title:">
                <Input onChange={this.filterTitleChange} />
              </Form.Item>
              <Form.Item label="Types of:">
                <Select
                  style={{ width: 120 }}
                  onChange={this.filterStatusChange}>
                  <Select.Option value="published">published</Select.Option>
                  <Select.Option value="draft">draft</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Recommended:">
                <Select
                  style={{ width: 120 }}
                  onChange={this.filterStarChange}>
                  <Select.Option value={1}>★</Select.Option>
                  <Select.Option value={2}>★★</Select.Option>
                  <Select.Option value={3}>★★★</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData}>
                  search
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}
        >
          <Column title="Serial number" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
          <Column title="title" dataIndex="title" key="title" width={200} align="center"/>
          <Column title="author" dataIndex="author" key="author" width={100} align="center"/>
          <Column title="Reading quantity" dataIndex="readings" key="readings" width={195} align="center"/>
          <Column title="Recommended" dataIndex="star" key="star" width={195} align="center"/>
          <Column title="condition" dataIndex="status" key="status" width={195} align="center" render={(status) => {
            let color =
              status === "published" ? "green" : status === "deleted" ? "red" : "";
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            );
          }}/>
          <Column title="time" dataIndex="date" key="date" width={195} align="center"/>
          <Column title="operate" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="Edit" onClick={this.handleEdit.bind(null,row)}/>
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="delete" onClick={this.handleDelete.bind(null,row)}/>
            </span>
          )}/>
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `common${total}Article data`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
        <EditForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.formRef = formRef}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}

export default TableComponent;
