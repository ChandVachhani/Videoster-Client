import React from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import { connect } from "react-redux";
import NoDataAvailable from "./assets/images/Nodata2.svg";

class Feed extends React.Component {
  renderCards = () => {
    if (this.props.channels.length == 0) {
      return (
        // <div class="spinner-border text-success" role="status">
        //   <span class="sr-only">Loading...</span>
        // </div>
        <div
          class="spinner-grow text-success"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
    if (this.props.channels.length == 1 && this.props.channels[0] == -1) {
      return (
        <div>
          <img
            style={{ width: "35vw" }}
            src={NoDataAvailable}
            alt="No data available"
          />
        </div>
      );
    }
    return this.props.channels.map((channel) => {
      if (
        !(
          this.props.hideChannel[channel.channelId] == true ||
          Object.values(this.props.hideChannel).filter((c) => c == true)
            .length == 0
        )
      )
        return null;
      return channel.videos.map((video) => {
        return (
          <Col
            xl={3}
            lg={4}
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-center"
          >
            {/* <Card className="feedCard" style={{ width: "30rem" }}> */}
            <Card
              className="feedCard"
              style={{ maxWidth: "90vw", width: "30rem" }}
            >
              <Card.Link
                style={{ textDecoration: "none", color: "white" }}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
              >
                <Card.Img
                  variant="top"
                  src={video.avatarMedium}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              </Card.Link>
              <Card.Body style={{ padding: "0px", paddingTop: "15px" }}>
                <Row>
                  <Col xs={2} className="" style={{ paddingRight: "0px" }}>
                    <Card.Text>
                      <Image
                        className="feedChannelImage"
                        src={channel.avatarDefault}
                        roundedCircle
                      />
                    </Card.Text>
                  </Col>
                  <Col xs={10} className="feedBody">
                    <Card.Link
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                    >
                      {video.title}
                    </Card.Link>
                    <Card.Link
                      href={`https://www.youtube.com/channel/${channel.channelId}`}
                      target="_blank"
                    >
                      <Card.Text className="feedChannelLink small">
                        {channel.name}
                      </Card.Text>
                    </Card.Link>
                    <Card.Text className="ffeedChannelLink small">
                      {video.views.length > 3
                        ? video.views.length > 6
                          ? video.views.slice(0, -6) +
                            (video.views.slice(-6, -5) > "0"
                              ? "." + video.views.slice(-6, -5)
                              : "") +
                            "M"
                          : video.views.slice(0, -3) +
                            (video.views.slice(-3, -2) > "0"
                              ? "." + video.views.slice(-3, -2)
                              : "") +
                            "K"
                        : video.views}{" "}
                      views • 5 hours ago
                      {/* 6.5K views • 5 hours ago */}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    });
  };

  render() {
    return (
      <div className="feed d-flex justify-content-center">
        <Row>{this.renderCards()}</Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    hideChannel: state.hideChannel,
  };
};

export default connect(mapStateToProps, {})(Feed);
