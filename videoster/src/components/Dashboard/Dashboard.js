import "./style.css";

import React from "react";
import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Feed from "./Feed";

import { getCategories } from "../../actions/index";
import { connect } from "react-redux";

class DashBoard extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="dashboard">
        <Header />
        <div className="front">
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col>
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

export default connect(null, { getCategories })(DashBoard);
