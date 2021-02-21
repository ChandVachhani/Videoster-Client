import React from 'react';
import { Col, Row, Card, Image } from 'react-bootstrap';

class Feed extends React.Component {

  renderCards = () => {
    return (
      <Col lg={3} md={12} sm={6} className="d-flex justify-content-center">
        <Card className="feedCard" style={{ width: '25rem' }} >
          <Card.Img variant="top" src="https://yt3.ggpht.com/ytc/AAUvwnhZR6J03u4p40scsmZXKBQAHZDkGGtbNzDhWQQ=s88-c-k-c0x00ffffff-no-rj" />
          <Card.Body style={{ padding: '0px', paddingTop: '15px' }}>
            <Row>
              <Col xs={2} className="" style={{ paddingRight: '0px' }}>
                <Card.Text>
                  <Image className="feedChannelImage" src="https://yt3.ggpht.com/ytc/AAUvwnhZR6J03u4p40scsmZXKBQAHZDkGGtbNzDhWQQ=s88-c-k-c0x00ffffff-no-rj" roundedCircle />
                </Card.Text>
              </Col>
              <Col xs={10} className="feedBody">
                <Card.Text className="feedTitle">
                  Chand
                  </Card.Text>
                <Card.Text className="feedChannelLink small">
                  Chand
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
  }

  render() {
    return (
      <div className="feed">
        <Row>
          {this.renderCards()}
          {this.renderCards()}
          {this.renderCards()}
          {this.renderCards()}
          {this.renderCards()}
          {this.renderCards()}
        </Row>
      </div>
    );
  }
}


export default Feed;