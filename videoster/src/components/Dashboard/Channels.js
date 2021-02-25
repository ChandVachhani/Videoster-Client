import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import history from "../../history";
import { connect } from "react-redux";

import { getChannels } from "../../actions/index";

class Channels extends React.Component {
  async componentDidMount() {
    await this.props.getChannels();
  }

  async componentDidUpdate(preProps) {
    if (preProps.selectedCategory != this.props.selectedCategory) {
      await this.props.getChannels();
    }
  }

  renderChannels = () => {
    return this.props.channels.map((channel) => {
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
    channels: state.channels,
    selectedCategory: state.selectedCategory,
  };
};

export default connect(mapStateToProps, { getChannels })(Channels);
