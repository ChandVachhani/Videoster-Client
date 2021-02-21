import React from 'react';
import { connect } from 'react-redux';

class Sidebar extends React.Component {

  renderCategory = () => {
    return (
      <div className="category">
        <span className="underline makeGray">
          General
        </span>
      </div>
    )
  }

  render() {
    return (
      <div className="sidebar fixed-top">
        <hr style={{ marginLeft: "5%", marginRight: "5%" }} className="sidebarHr" />
        {this.renderCategory()}
        {this.renderCategory()}
        {this.renderCategory()}

        <div className="addCategory">
          <span className="makeGray">
            <ion-icon name="add"></ion-icon>

          </span>
        </div>
      </div >
    );
  }
}

export default Sidebar;