import React from "react";
import { Link } from "react-router-dom";
import { Image, Row } from "react-bootstrap";

import history from "../../history";
import { connect } from "react-redux";

import {
  getChannels,
  selectChannel,
  clearChannelsRelatedStates,
  removeChannel,
  channelPagination,
} from "../../actions/index";
import { Col } from "react-bootstrap";

class Channels extends React.Component {
  async componentDidMount() {
    await this.props.clearChannelsRelatedStates();
  }

  async componentDidUpdate(preProps) {
    if (preProps.selectedCategory != this.props.selectedCategory)
      await this.props.channelPagination(0);
  }

  renderChannels = () => {
    return this.props.channels.map((channel, ind) => {
      if (
        ind < this.props.pagination[0] ||
        ind >= this.props.pagination[0] + this.props.pagination[1]
      ) {
        return null;
      }
      return (
        <div className="channel">
          <Image
            data-toggle="tooltip"
            data-placement="top"
            title={`${channel.name}`}
            className="channelIcon"
            src={channel.avatarDefault}
            onClick={(event) => {
              if (event.ctrlKey) {
                if (this.props.selectedCategory == "GENERAL") {
                  window.alert(
                    "You can not delete channel from default category!!"
                  );
                } else {
                  const responce = window.prompt("Say Yes!");
                  if (responce?.toLowerCase() == "yes") {
                    this.props.removeChannel(channel.channelId);
                  }
                  if (this.props.hideChannel)
                    this.props.selectChannel(channel.channelId);
                }
              } else {
                event.currentTarget.classList.toggle("changeBorderRadius");
                this.props.selectChannel(channel.channelId);
              }
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderRadius = "25%";
            }}
            onMouseLeave={(event) => {
              if (!event.currentTarget.classList.contains("changeBorderRadius"))
                event.currentTarget.style.borderRadius = "50%";
            }}
          />
        </div>
      );
    });
  };
  renderAddChannels = () => {
    if (this.props.selectedCategory == "GENERAL") return null;
    return (
      <div
        data-toggle="tooltip"
        data-placement="top"
        title="Add Channel"
        onClick={() => {
          history.push("/SearchChannels");
        }}
      >
        <ion-icon
          name="add"
          size="large"
          style={{
            marginTop: `${
              this.props.channels.length == 0 ||
              (this.props.channels.length == 1 && this.props.channels[0] == -1)
                ? "23px"
                : "0px"
            }`,
            marginBottom: `${
              this.props.channels.length == 0 ||
              (this.props.channels.length == 1 && this.props.channels[0] == -1)
                ? "12px"
                : "0px"
            }`,
            border: "2px solid white",
            borderRadius: "50%",
            transform: "scale(1.8) translateY(5%)",
            borderColor: "#a0a0a0",
            color: "#a0a0a0",
            cursor: "pointer",
            // maxWidth: "8vw",
            // maxHeight: "8vw",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.classList.toggle("makeGray");
          }}
          onMouseLeave={(event) => {
            event.currentTarget.classList.toggle("makeGray");
          }}
        ></ion-icon>
      </div>
    );
  };
  render() {
    return (
      <Row
        className="channels fixed-top"
        style={{
          paddingLeft: `${
            this.props.hideSidebar || window.innerWidth <= 990 ? "0%" : "16%"
          }`,
        }}
      >
        <Col>
          <div className="addChannel" style={{ maxWidth: "55vw" }}>
            {this.renderAddChannels()}
          </div>
          <span
            data-toggle="tooltip"
            data-placement="top"
            title="Previous"
            onClick={async () => {
              console.log("reached!");
              await this.props.channelPagination(
                Math.max(this.props.pagination[0] - this.props.pagination[2], 0)
              );
            }}
          >
            <ion-icon
              name="chevron-back-outline"
              style={{
                transform: "scale(2)",
                margin: "0 5px",
                cursor: "pointer",
                display: `${
                  this.props.pagination[0] == 0 ? "none" : "inline-block"
                }`,
              }}
            ></ion-icon>
          </span>
          {this.renderChannels()}
          <span
            data-toggle="tooltip"
            data-placement="top"
            title="Next"
            onClick={async () => {
              console.log("reached!");
              await this.props.channelPagination(
                Math.min(
                  this.props.pagination[0] + this.props.pagination[2],
                  this.props.channels.length - this.props.pagination[1]
                )
              );
            }}
          >
            <ion-icon
              name="chevron-forward-outline"
              style={{
                transform: "scale(2)",
                margin: "0 5px",
                cursor: "pointer",
                display: `${
                  this.props.pagination[0] + this.props.pagination[1] >=
                  this.props.channels.length
                    ? "none"
                    : "inline-block"
                }`,
              }}
            ></ion-icon>
          </span>
          <hr className="channelHr" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    selectedCategory: state.selectedCategory,
    hideSidebar: state.hideSidebar,
    hideChannel: state.hideChannel,
    pagination: state.channelsPagination,
  };
};

export default connect(mapStateToProps, {
  getChannels,
  selectChannel,
  clearChannelsRelatedStates,
  removeChannel,
  channelPagination,
})(Channels);
