import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import menuList from "@/config/menuConfig";
import "./index.less";
/**
 * Find the path of routing jump in the MenuConfig according to the routing address of the current browser address bar.
 * If the route address is/charts/keyboard,Then find the path to[{title: "chart",...},{title: "Keyboard chart",...}]
 */
const getPath = (menuList, pathname) => {
  let temppath = [];
  try {
    function getNodePath(node) {
      temppath.push(node);
      //Find the eligible node and terminate it through the THROW
      if (node.path === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //The child node of the current node is still not found, then the node in the path is deleted.
        temppath.pop();
      } else {
        //When you find the leaves node, remove the leaves node in the path.
        temppath.pop();
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return temppath;
  }
};

const BreadCrumb = (props) => {
  const { location } = props;
  const { pathname } = location;
  let path = getPath(menuList, pathname);
  const first = path && path[0];
  if (first && first.title.trim() !== "Dashboard") {
    path = [{ title: "Dashboard", path: "/dashboard" }].concat(path);
  }
  return (
    <div className="Breadcrumb-container">
      <Breadcrumb>
        {path &&
          path.map((item) =>
            item.title === "Dashboard" ? (
              <Breadcrumb.Item key={item.path}>
                <a href={`#${item.path}`}>{item.title}</a>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
            )
          )}
      </Breadcrumb>
    </div>
  );
};

export default withRouter(BreadCrumb);
