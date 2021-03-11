import React from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import { connect } from "react-redux";

class Feed extends React.Component {
  renderCards = () => {
    if (this.props.channels.length == 0) {
      return (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
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
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className="d-flex justify-content-center"
          >
            <Card className="feedCard" style={{ width: "30rem" }}>
              <Card.Img variant="top" src={video.avatarMedium} />
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
                    <Card.Text className="feedTitle">{video.title}</Card.Text>
                    <Card.Text className="feedChannelLink small">
                      {channel.name}
                    </Card.Text>
                    <Card.Text className="ffeedChannelLink small">
                      6.5K views • 5 hours ago
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
