import React from 'react';
import { Col, Row, Card, Image } from 'react-bootstrap';

class Feed extends React.Component {

  renderCards = () => {
    return (
      <Col lg={3} md={12} sm={6} className="d-flex justify-content-center">
        <Card className="feed--video--card" style={{ width: '25rem' }} >
          <Card.Img variant="top" src="https://yt3.ggpht.com/ytc/AAUvwnhZR6J03u4p40scsmZXKBQAHZDkGGtbNzDhWQQ=s88-c-k-c0x00ffffff-no-rj" />
          <Card.Body style={{ padding: '0px', paddingTop: '15px' }}>
            <Row>
              <Col xs={2} className="feed--video--body--image" style={{ paddingRight: '0px' }}>
                <Card.Text>
                  <Image className="feed--video--channel--image" src="https://yt3.ggpht.com/ytc/AAUvwnhZR6J03u4p40scsmZXKBQAHZDkGGtbNzDhWQQ=s88-c-k-c0x00ffffff-no-rj" roundedCircle />
                </Card.Text>
              </Col>
              <Col xs={10} className="feed--video--body">
                <Card.Text className="feed--video--title">
                  Chand
                  </Card.Text>
                <Card.Text className="feed--video--channel--link small">
                  Chand
                  </Card.Text>
                <Card.Text className="feed--video--channel--link small">
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