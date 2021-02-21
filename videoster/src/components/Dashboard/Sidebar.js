import React from 'react';
import { ListGroup, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Sidebar extends React.Component {

  renderCategory = () => {
    return (
      <div className="category">
        General
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
          <ion-icon name="add"></ion-icon>
        </div>
      </div >
    );
  }
}

export default Sidebar;