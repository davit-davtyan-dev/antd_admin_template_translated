import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Tag } from "antd";
import { deleteTag, emptyTaglist, closeOtherTags } from "@/store/actions";
class TagList extends Component {
  tagListContainer = React.createRef();
  contextMenuContainer = React.createRef();
  state = {
    left: 0,
    top: 0,
    menuVisible: false,
  };
  handleClose = (tag) => {
    const { history, deleteTag, taglist } = this.props;
    const path = tag.path;
    const currentPath = history.location.pathname;
    const length = taglist.length;
    // If it is closed, it is a current page, jump to the last Tag
    if (path === currentPath) {
      history.push(taglist[length - 1].path);
    }
    // If the last tag is closed, and the currently displayed page is also the page corresponding to the last TAG, the routing jump
    if (
      path === taglist[length - 1].path &&
      currentPath === taglist[length - 1].path
    ) {
      // Because Cuttaglist is executed, the corresponding route jumps to the previous tags, should be -2
      if (length - 2 > 0) {
        history.push(taglist[length - 2].path);
      } else if (length === 2) {
        history.push(taglist[0].path);
      }
    }

    // First jump the route, then modify the Taglist of the State tree
    deleteTag(tag);
  };
  handleClick = (path) => {
    this.props.history.push(path);
  };
  openContextMenu = (tag, event) => {
    event.preventDefault();
    const menuMinWidth = 105;
    const clickX = event.clientX;
    const clickY = event.clientY; // Y coordinate of the mouse when the event occurs
    const clientWidth = this.tagListContainer.current.clientWidth; // container width
    const maxLeft = clientWidth - menuMinWidth; // left boundary

    // When the mouse click position is greater than the left boundary, the position of the mouse click is right, put the menu on the left.
    if (clickX > maxLeft) {
      this.setState({
        left: clickX - menuMinWidth + 15,
        top: clickY,
        menuVisible: true,
        currentTag: tag,
      });
    } else {
      // Conversely, when the position of the mouse is left, put the menu on the right
      this.setState({
        left: clickX,
        top: clickY,
        menuVisible: true,
        currentTag: tag,
      });
    }
  };
  handleClickOutside = (event) => {
    const { menuVisible } = this.state;
    const isOutside = !(
      this.contextMenuContainer.current &&
      this.contextMenuContainer.current.contains(event.target)
    );
    if (isOutside && menuVisible) {
      this.closeContextMenu();
    }
  };
  closeContextMenu() {
    this.setState({
      menuVisible: false,
    });
  }
  componentDidMount() {
    document.body.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }
  handleCloseAllTags = () => {
    this.props.emptyTaglist();
    this.props.history.push("/dashboard");
    this.closeContextMenu();
  };
  handleCloseOtherTags = () => {
    const currentTag = this.state.currentTag;
    const { path } = currentTag;
    this.props.closeOtherTags(currentTag)
    this.props.history.push(path);
    this.closeContextMenu();
  };
  render() {
    const { left, top, menuVisible } = this.state;
    const { taglist, history } = this.props;
    const currentPath = history.location.pathname;
    return (
      <>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          hideTracksWhenNotNeeded={true}
          renderView={(props) => (
            <div {...props} className="scrollbar-container" />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className="scrollbar-track-vertical" />
          )}
        >
          <ul className="tags-wrap" ref={this.tagListContainer}>
            {taglist.map((tag) => (
              <li key={tag.path}>
                <Tag
                  onClose={this.handleClose.bind(null, tag)}
                  closable={tag.path !== "/dashboard"}
                  color={currentPath === tag.path ? "geekblue" : "gold"}
                  onClick={this.handleClick.bind(null, tag.path)}
                  onContextMenu={this.openContextMenu.bind(null, tag)}
                >
                  {tag.title}
                </Tag>
              </li>
            ))}
          </ul>
        </Scrollbars>
        {menuVisible ? (
          <ul
            className="contextmenu"
            style={{ left: `${left}px`, top: `${top}px` }}
            ref={this.contextMenuContainer}
          >
            <li onClick={this.handleCloseOtherTags}>Close others</li>
            <li onClick={this.handleCloseAllTags}>Close all</li>
          </ul>
        ) : null}
      </>
    );
  }
}
export default withRouter(
  connect((state) => state.tagsView, {
    deleteTag,
    emptyTaglist,
    closeOtherTags,
  })(TagList)
);
