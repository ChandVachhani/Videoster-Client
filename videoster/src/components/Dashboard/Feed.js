import React from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import { connect } from "react-redux";
import NoDataAvailable from "./assets/images/Nodata2.svg";

import { videoPagination, getVideos } from "../../actions";

class Feed extends React.Component {
  // componentDidMount() {
  //   window.addEventListener("scroll", this.scrollCapture);
  // }
  // scrollCapture = async () => {
  //   if (
  //     window.innerHeight + window.pageYOffset == document.body.clientHeight &&
  //     !(
  //       this.props.pagination[0] >= 4 ||
  //       this.props.channels.length == 0 ||
  //       this.props.channels[0] == -1
  //     )
  //   ) {
  //     document.querySelector(".pagination--loader").style.display =
  //       "inline-block";
  //     await this.props.videoPagination(
  //       Math.min(this.props.pagination[0] + 1, 4)
  //     );
  //     await this.props.getVideos();
  //     document.querySelector(".pagination--loader").style.display = "none";
  //   }
  // };
  renderCards = () => {
    if (
      this.props.channels.length == 0 ||
      (this.props.videos.length == 0 && this.props.channels[0] != -1)
    ) {
      return (
        <div
          class="spinner-grow text-success d-flex justify-content-center"
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
    return this.props.videos.map((video) => {
      if (
        !(
          this.props.hideChannel[video.fk_channelId] == true ||
          Object.values(this.props.hideChannel).filter((c) => c == true)
            .length == 0
        )
      )
        return null;
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
                      src={video.channelAvatarDefault}
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
                    href={`https://www.youtube.com/channel/${video.fk_channelId}`}
                    target="_blank"
                  >
                    <Card.Text className="feedChannelLink small">
                      {video.channelName}
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
  };

  render() {
    return (
      <div
        className={`feed ${
          (this.props.channels.length == 1 && this.props.channels[0] == -1) ||
          this.props.channels.length == 0 ||
          this.props.videos.length == 0
            ? "d-flex justify-content-center"
            : ""
        }`}
      >
        <Row>{this.renderCards()}</Row>
        <div
          class="spinner-grow text-success pagination--loader"
          style={{
            width: "3rem",
            height: "3rem",
            display: "none",
          }}
          role="status"
        ></div>
        <button
          className="videoPagination--btn"
          style={{
            width: "100px",
            display: `${
              this.props.pagination[0] >= 4 ||
              this.props.channels.length == 0 ||
              this.props.channels[0] == -1
                ? "none"
                : "inline-block"
            }`,
          }}
          onClick={async () => {
            document.querySelector(".videoPagination--btn").disabled = true;
            document.querySelector(".pagination--loader").style.display =
              "inline-block";
            await this.props.videoPagination(
              Math.min(this.props.pagination[0] + 1, 4)
            );
            await this.props.getVideos();
            document.querySelector(".pagination--loader").style.display =
              "none";
            document.querySelector(".videoPagination--btn").disabled = false;
          }}
        >
          <ion-icon name="chevron-forward-outline" size="large"></ion-icon>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    hideChannel: state.hideChannel,
    videos: state.videos,
    pagination: state.videoPagination,
  };
};

export default connect(mapStateToProps, { videoPagination, getVideos })(Feed);
