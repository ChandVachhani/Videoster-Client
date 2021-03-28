import React from "react";
import { connect } from "react-redux";

import {
  addCategory,
  selectCategory,
  getCategories,
  clearHideChannels,
  clearAllChannels,
  removeCategory,
  getChannels,
  renameCategory,
  getVideos,
  videoPagination,
} from "../../actions/index";

class Sidebar extends React.Component {
  renderCategory = () => {
    return this.props.categories.map((category, ind) => {
      return (
        <div
          className="category"
          onClick={async (event) => {
            if (event.ctrlKey) {
              const responce = window.prompt("say yes!");
              if (responce?.toLowerCase() == "yes") {
                if (category == "GENERAL") {
                  window.alert("You can not delete default category!");
                } else {
                  await this.props.removeCategory(category);
                  // if (this.props.selectedCategory == "GENERAL") {
                  //   await this.props.clearAllChannels();
                  //   await this.props.videoPagination(0);
                  //   await this.props.getChannels();
                  //   await this.props.getVideos();
                  // }
                  if (this.props.selectedCategory == category) {
                    await this.props.selectCategory("GENERAL");
                    await this.props.clearAllChannels();
                    await this.props.videoPagination(0);
                    await this.props.getChannels();
                    await this.props.getVideos();
                  } else if (this.props.selectedCategory == "GENERAL") {
                    await this.props.clearAllChannels();
                    await this.props.videoPagination(0);
                    await this.props.getChannels();
                    await this.props.getVideos();
                  }
                }
              }
            } else if (
              event.shiftKey &&
              this.props.selectedCategory == category
            ) {
              const newCategory = window.prompt("Enter new name!");
              if (newCategory) {
                await this.props.renameCategory(newCategory.toUpperCase());
                await this.props.selectCategory(newCategory.toUpperCase());
              }
            } else {
              if (this.props.selectedCategory != category) {
                await this.props.clearHideChannels();
                await this.props.clearAllChannels();
                [...document.querySelectorAll(".channelIcon")].forEach((e) => {
                  e.classList.remove("changeBorderRadius");
                  e.style.borderRadius = "50%";
                });
                await this.props.selectCategory(category);
                await this.props.clearAllChannels();
                await this.props.videoPagination(0);
                await this.props.getChannels();
                await this.props.getVideos();
              }
            }
          }}
        >
          <button
            className={`btn--category ${
              this.props.selectedCategory == category ? "made--transition" : ""
            }`}
          >
            {category.toUpperCase()}
          </button>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="sidebar fixed-top"
        style={{
          width: `${
            window.innerWidth < 992 && !this.props.hideSidebar ? "300px" : ""
          }`,
        }}
      >
        <hr
          style={{ marginLeft: "5%", marginRight: "5%" }}
          className="sidebarHr"
        />
        <div className="category-collection">
          <center>
            <div className="collectionOfCategories">
              {this.renderCategory()}
            </div>
            <div className="addCategory">
              <button
                className="btn--category"
                onClick={async () => {
                  const category = window.prompt()?.toUpperCase();
                  if (category) {
                    const responce = await this.props.addCategory(category);
                    console.log(responce);
                    if (responce) await this.props.selectCategory(category);
                  }
                }}
              >
                {/* <ion-icon name="add"></ion-icon> */}
                <big>
                  <strong>+</strong>
                </big>
              </button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    hideSidebar: state.hideSidebar,
  };
};

export default connect(mapStateToProps, {
  addCategory,
  selectCategory,
  getCategories,
  clearHideChannels,
  clearAllChannels,
  removeCategory,
  getChannels,
  renameCategory,
  getVideos,
  videoPagination,
})(Sidebar);
