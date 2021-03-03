import React from "react";
import { Link } from "react-router-dom";
import { Image, Row } from "react-bootstrap";

import history from "../../history";
import { connect } from "react-redux";

import { getChannels } from "../../actions/index";
import { Col } from "react-bootstrap";

class Channels extends React.Component {
  async componentDidMount() {
    // await this.props.getChannels();
  }

  async componentDidUpdate(preProps) {
    if (preProps.selectedCategory != this.props.selectedCategory) {
      // await this.props.getChannels();
    }
  }

  renderChannels = () => {
    return this.props.channels.map((channel) => {
      return (
        <div className="channel">
          <Image
            className="channelIcon"
            src={channel.avatarDefault}
            // roundedCircle
            onClick={(event) => {
              event.currentTarget.classList.toggle("changeBorderRadius");
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderRadius = "25%";
              // event.currentTarget.classList.toggle("underline");
            }}
            onMouseLeave={(event) => {
              if (!event.currentTarget.classList.contains("changeBorderRadius"))
                event.currentTarget.style.borderRadius = "50%";
              // event.currentTarget.classList.toggle("underline");
            }}
          />
        </div>
      );
    });
  };
  render() {
    return (
      // <div>
      <Row
        className="channels fixed-top"
        style={{ paddingLeft: `${this.props.hideSidebar ? "0%" : "16%"}` }}
      >
        <Col>
          <div className="addChannel">
            <ion-icon
              name="add"
              size="large"
              style={{
                border: "2px solid white",
                borderRadius: "50%",
                transform: "scale(1.8) translateY(5%)",
              }}
              onClick={() => {
                history.push("/SearchChannels");
              }}
              onMouseEnter={(event) => {
                event.currentTarget.classList.toggle("makeGray");
              }}
              onMouseLeave={(event) => {
                event.currentTarget.classList.toggle("makeGray");
              }}
            ></ion-icon>
          </div>
          {this.renderChannels()}

          <hr className="channelHr" />
        </Col>
      </Row>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    selectedCategory: state.selectedCategory,
    hideSidebar: state.hideSidebar,
  };
};

export default connect(mapStateToProps, { getChannels })(Channels);
