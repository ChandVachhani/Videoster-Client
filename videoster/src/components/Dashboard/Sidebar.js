import React from "react";
import { connect } from "react-redux";

import {
  addCategory,
  selectCategory,
  getCategories,
  clearHideChannels,
  clearAllChannels,
} from "../../actions/index";

class Sidebar extends React.Component {
  async componentDidMount() {
    // await this.props.getCategories();
  }

  renderCategory = () => {
    return this.props.categories.map((category, ind) => {
      return (
        <div
          className="category"
          onClick={async (event) => {
            await this.props.clearHideChannels();
            await this.props.clearAllChannels();
            [...document.querySelectorAll(".channelIcon")].forEach((e) => {
              e.classList.remove("changeBorderRadius");
              e.style.borderRadius = "50%";
            });
            await this.props.selectCategory(category);
          }}
        >
          <span
            style={{
              display: `${
                this.props.selectedCategory == category
                  ? "inline-block"
                  : "none"
              }`,
            }}
            className="activateDot"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-dot"
              viewBox="0 0 16 16"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
          </span>
          <span className="categorySelf underline makeGray">{category}</span>
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
        <div className="collectionOfCategories">{this.renderCategory()}</div>
        <div className="addCategory">
          <span
            className="makeGray"
            onClick={async () => {
              const category = window.prompt();
              await this.props.addCategory(category);
              await this.props.selectCategory(category);
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

export default connect(mapStateToProps, {
  addCategory,
  selectCategory,
  getCategories,
  clearHideChannels,
  clearAllChannels,
})(Sidebar);
