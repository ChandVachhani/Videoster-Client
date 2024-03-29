import React from 'react';
import { Col, Row, Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

class Feed extends React.Component {

  renderCards = () => {
    if (!this.props.categories[this.props.selectedCategory]) return null;
    return this.props.categories[this.props.selectedCategory].map((channel) => {
      return (
        channel.videos.map((video) => {
          return (
            <Col lg={3} md={12} sm={6} className="d-flex justify-content-center">
              <Card className="feedCard" style={{ width: '25rem' }} >
                <Card.Img variant="top" src={video.avatarHigh} />
                <Card.Body style={{ padding: '0px', paddingTop: '15px' }}>
                  <Row>
                    <Col xs={2} className="" style={{ paddingRight: '0px' }}>
                      <Card.Text>
                        <Image className="feedChannelImage" src={channel.avatarHigh} roundedCircle />
                      </Card.Text>
                    </Col>
                    <Col xs={10} className="feedBody">
                      <Card.Text className="feedTitle">
                        {video.title}
                      </Card.Text>
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
          )
        })
      )
    });
  }

  render() {
    return (
      <div className="feed">
        <Row>
          {this.renderCards()}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories, selectedCategory: state.selectedCategory };
}

export default connect(mapStateToProps, {})(Feed);