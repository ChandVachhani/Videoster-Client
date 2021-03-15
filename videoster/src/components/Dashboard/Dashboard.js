import "./style.css";

import React from "react";
import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Feed from "./Feed";

import { connect } from "react-redux";

class DashBoard extends React.Component {
  async componentDidMount() {
    console.log("Dashboard.componentDidMount");
  }

  async componentDidUpdate() {
    console.log("Dashboard.componentDidUpdate");
  }

  render() {
    this.Side = {
      display: !this.props.hideSidebar ? "block" : "none",
      grid: !this.props.hideSidebar ? 2 : 0,
    };
    return (
      <div className="dashboard">
        <Header />
        <div className="front">
          <Row>
            <Col
              md={this.Side.grid}
              sm={12}
              style={{
                paddingRight: "0px",
                display: this.Side.display,
              }}
            >
              <Sidebar />
            </Col>
            <Col style={{ paddingLeft: "40px" }}>
              <div className="feed">
                <Channels />
                <Feed />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { hideSidebar: state.hideSidebar };
};

export default connect(mapStateToProps, {})(DashBoard);
