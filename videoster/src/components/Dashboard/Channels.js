import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import history from "../../history";
import { connect } from "react-redux";

class Channels extends React.Component {
  renderChannels = () => {
    if (!this.props.categories[this.props.selectedCategory]) return null;
    return this.props.categories[this.props.selectedCategory].map((channel) => {
      return (
        <div className="channel">
          <Image
            className="channelIcon"
            src={channel.avatarDefault}
            roundedCircle
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="channels fixed-top">
        <div
          className="addChannel"
          onClick={() => {
            history.push("/SearchChannels");
          }}
        >
          <ion-icon name="add" size="large"></ion-icon>
        </div>
        {this.renderChannels()}

        <hr className="channelHr" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  };
};

export default connect(mapStateToProps, {})(Channels);
