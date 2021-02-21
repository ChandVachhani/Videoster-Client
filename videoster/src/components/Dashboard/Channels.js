import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from "react-bootstrap";

class Channels extends React.Component {
  renderChannels = () => {
    return (
      <div className="channel">
        <Image
          className="channelList--img"
          src="https://yt3.ggpht.com/ytc/AAUvwnhZR6J03u4p40scsmZXKBQAHZDkGGtbNzDhWQQ=s88-c-k-c0x00ffffff-no-rj"
          roundedCircle
        />
      </div>
    )
  }
  render() {
    return (
      <div className="channels fixed-top">
        <div className="addChannel">
          <ion-icon name="add" size="large"></ion-icon>
        </div>
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}
        {this.renderChannels()}

        <hr className="channelHr" />
      </div>
    );
  }
}


export default Channels;