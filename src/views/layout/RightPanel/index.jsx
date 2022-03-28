import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Switch, Row, Col, Divider, Alert, Button } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { toggleSettingPanel, changeSetting } from "@/store/actions";
import clip from "@/utils/clipboard";

const RightPanel = (props) => {
  const {
    settingPanelVisible,
    toggleSettingPanel,
    changeSetting,
    sidebarLogo: defaultSidebarLogo,
    fixedHeader: defaultFixedHeader,
    tagsView: defaultTagsView,
  } = props;

  const [sidebarLogo, setSidebarLogo] = useState(defaultSidebarLogo);
  const [fixedHeader, setFixedHeader] = useState(defaultFixedHeader);
  const [tagsView, setTagsView] = useState(defaultTagsView);

  const sidebarLogoChange = (checked) => {
    setSidebarLogo(checked);
    changeSetting({ key: "sidebarLogo", value: checked });
  };

  const fixedHeaderChange = (checked) => {
    setFixedHeader(checked);
    changeSetting({ key: "fixedHeader", value: checked });
  };

  const tagsViewChange = (checked) => {
    setTagsView(checked);
    changeSetting({ key: "tagsView", value: checked });
  };

  const handleCopy = (e) => {
    let config = `
    export default {
      showSettings: true,
      sidebarLogo: ${sidebarLogo},
      fixedHeader: ${fixedHeader},
      tagsView: ${tagsView},
    }
    `;
    clip(config, e);
  };

  return (
    <div className="rightSettings">
      <Drawer
        title="System settings"
        placement="right"
        width={350}
        onClose={toggleSettingPanel}
        visible={settingPanelVisible}
      >
        <Row>
          <Col span={12}>
            <span>Sidebar Logo</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="open"
              unCheckedChildren="close"
              defaultChecked={sidebarLogo}
              onChange={sidebarLogoChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>fixed Header</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="open"
              unCheckedChildren="close"
              defaultChecked={fixedHeader}
              onChange={fixedHeaderChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>Open Tags-View</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="open"
              unCheckedChildren="close"
              defaultChecked={tagsView}
              onChange={tagsViewChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={24}>
            <Alert
              message="Developers please pay attention:"
              description="The configuration bar is only used in the development environment for preview, the production environment will not present, please copy the /src/defaultsettings.js configuration file after copying"
              type="warning"
              showIcon
              icon={<NotificationOutlined />}
              style={{ marginBottom: "16px" }}
            />
            <Button style={{ width: "100%" }} icon="copy" onClick={handleCopy}>
              Copy configuration
            </Button>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};

export default connect(mapStateToProps, { toggleSettingPanel, changeSetting })(
  RightPanel
);
