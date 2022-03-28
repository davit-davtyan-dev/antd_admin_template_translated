import React from "react";
import { connect } from "react-redux";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { toggleSiderBar } from "@/store/actions";
import "./index.less";

const Hamburger = (props) => {
  const { sidebarCollapsed, toggleSiderBar } = props;
  const Icon = sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined;

  return (
    <div className="hamburger-container">
      <Icon onClick={toggleSiderBar} />
    </div>
  );
};

export default connect((state) => state.app, { toggleSiderBar })(Hamburger);
