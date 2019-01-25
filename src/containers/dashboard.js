import React from "react";
import { Collapse, Col, Row } from "antd";
import MermCard from "../components/MermCard/MermCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCarousel from "../components/Carousel/CustomCarousel";

const Panel = Collapse.Panel;

const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden",
  textAlign: "left"
};

const Dashboard = () => {
  return (
    <Collapse bordered={false} defaultActiveKey={["1", "2"]}>
      <Panel header="Popular" key="1" style={customPanelStyle}>
        <Row gutter={16}>
          <Col span={6}>
            <MermCard
              title="Sample Merm"
              lastAccessed="Jan 1, 1975"
              sharedTime="Jan 12, 2018"
              owner="Zachariah Pustowka"
              sharer="Veryvery long named Person"
              actions={[
                <FontAwesomeIcon icon="cog" key="settings" />,
                <FontAwesomeIcon icon="edit" key="edit" />,
                <FontAwesomeIcon icon="comments" key="comments" />
              ]}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              tags={["sample1", "sample2"]}
            />
          </Col>
        </Row>
      </Panel>
      <Panel header="Unread Resources" key="2" style={customPanelStyle}>
        <Row gutter={16}>
          <Col>
            <Row>
              <CustomCarousel>
                <MermCard
                  title="First"
                  lastAccessed="Jan 1, 1975"
                  sharedTime="Jan 12, 2018"
                  owner="Zachariah Pustowka"
                  sharer="Veryvery long named Person"
                  actions={[
                    <FontAwesomeIcon icon="cog" key="settings" />,
                    <FontAwesomeIcon icon="edit" key="edit" />,
                    <FontAwesomeIcon icon="comments" key="comments" />
                  ]}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  tags={["sample1", "sample2"]}
                />

                <MermCard
                  title="Second"
                  lastAccessed="Jan 1, 1975"
                  sharedTime="Jan 12, 2018"
                  owner="Zachariah Pustowka"
                  sharer="Veryvery long named Person"
                  actions={[
                    <FontAwesomeIcon icon="cog" key="settings" />,
                    <FontAwesomeIcon icon="edit" key="edit" />,
                    <FontAwesomeIcon icon="comments" key="comments" />
                  ]}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  tags={["sample1", "sample2"]}
                />

                <MermCard
                  title="Third"
                  lastAccessed="Jan 1, 1975"
                  sharedTime="Jan 12, 2018"
                  owner="Zachariah Pustowka"
                  sharer="Veryvery long named Person"
                  actions={[
                    <FontAwesomeIcon icon="cog" key="settings" />,
                    <FontAwesomeIcon icon="edit" key="edit" />,
                    <FontAwesomeIcon icon="comments" key="comments" />
                  ]}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  tags={["sample1", "sample2"]}
                />

                <MermCard
                  title="Fourth"
                  lastAccessed="Jan 1, 1975"
                  sharedTime="Jan 12, 2018"
                  owner="Zachariah Pustowka"
                  sharer="Veryvery long named Person"
                  actions={[
                    <FontAwesomeIcon icon="cog" key="settings" />,
                    <FontAwesomeIcon icon="edit" key="edit" />,
                    <FontAwesomeIcon icon="comments" key="comments" />
                  ]}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  tags={["sample1", "sample2"]}
                />
              </CustomCarousel>
            </Row>
          </Col>
        </Row>
      </Panel>
      <Panel header="Favourites" key="3" style={customPanelStyle}>
        <Row gutter={16} />
      </Panel>
    </Collapse>
  );
};

export default Dashboard;
