import React from "react";
import { Button, Layout, Badge, Icon, Input, Popover } from "antd";
const Search = Input.Search;

import NewResourceModal from "./NewResourceModal";

const { Header } = Layout;

const text = <span>Notifications</span>;
const content = (
  <div>
    <p>Content #1</p>
    <p>Content #2</p>
    <p>Content #3</p>
    <p>Content #4</p>
  </div>
);

class CustomHeader extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;

    return (
      <Header style={{ background: "#fff" }}>
        <div className="header-container">
          <div style={{ float: "left" }}>
            <Button type="primary" icon="plus-circle" onClick={this.showModal}>
              Add New Resource
            </Button>
          </div>
          <h2>merm.io</h2>
          <div
            style={{ marginTop: "16px", marginRight: "10px", float: "right" }}
          >
            <div style={{ float: "left" }}>
              <Search
                placeholder="Search..."
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
            <div
              style={{ marginTop: "-8px", marginLeft: "10px", float: "right" }}
            >
              <Popover
                placement="bottomRight"
                title={text}
                content={content}
                trigger="click"
              >
                <Badge count={5}>
                  <Icon
                    style={{ fontSize: "24px" }}
                    type="bell"
                    theme="filled"
                  />
                </Badge>
              </Popover>
            </div>
          </div>
        </div>
        <NewResourceModal
          visible={visible}
          loading={loading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </Header>
    );
  }
}

export default CustomHeader;
