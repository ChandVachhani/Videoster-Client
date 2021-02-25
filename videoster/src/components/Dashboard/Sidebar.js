import React from "react";
import { connect } from "react-redux";

import { addCategory, selectCategory } from "../../actions/index";

class Sidebar extends React.Component {
  renderCategory = () => {
    return Object.keys(this.props.categories).map((category, ind) => {
      return (
        <div
          className="category"
          onClick={async () => {
            await this.props.selectCategory(category);
          }}
        >
          <span className="underline makeGray">{category}</span>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="sidebar fixed-top">
        <hr
          style={{ marginLeft: "5%", marginRight: "5%" }}
          className="sidebarHr"
        />
        {this.renderCategory()}
        <div className="addCategory">
          <span
            className="makeGray"
            onClick={async () => {
              const category = window.prompt();
              await this.props.addCategory(category);
            }}
          >
            <ion-icon name="add"></ion-icon>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  };
};

export default connect(mapStateToProps, { addCategory, selectCategory })(
  Sidebar
);
