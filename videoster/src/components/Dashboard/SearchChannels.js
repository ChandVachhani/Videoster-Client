import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { ErrorMessage, Field, Form, Formik } from "formik";

import {
  searchChannels,
  addChannels,
  clearSearchedChannels,
} from "../../actions/index";
import { connect } from "react-redux";

import history from "../../history";

class Header extends React.Component {
  renderChannels = () => {
    return this.props.searchedChannels.map((channel, ind) => {
      return (
        <div
          className="searchChannelsCard"
          onClick={(event) => {
            event.currentTarget.classList.toggle(
              "searchCchannelsCardSelection"
            );
          }}
        >
          <img
            src={channel.snippet.thumbnails.high.url}
            alt="Avatar"
            className="searchChannelsCardAvatar"
          />
          {/* <span className="searchChannelData">Chand</span> */}
          {/* <p>{channel.snippet.description}</p>
          <p>{channel.statistics.subscriberCount}</p>
          <p>{channel.statistics.videoCount}</p>
          <p>{channel.statistics.viewCount}</p> */}
        </div>
      );
      // return (
      //   <div
      //     key={ind}
      //     className="searchChannelsCard"
      //     onClick={(event) => {
      //       event.currentTarget.classList.toggle(
      //         "searchCchannelsCardSelection"
      //       );
      //     }}
      //   >
      //     <img
      //       src={channel.snippet.thumbnails.high.url}
      //       alt="Avatar"
      //       className="searchChannelsCardAvatar"
      //     />
      //     <p className="searchChannelCardTitle">{channel.snippet.title}</p>
      //     <p>{channel.snippet.description}</p>
      //     <p>{channel.statistics.subscriberCount}</p>
      //     <p>{channel.statistics.videoCount}</p>
      //     <p>{channel.statistics.viewCount}</p>
      //   </div>
      // );
    });
  };

  render() {
    return (
      <div className="searchChannelsBody">
        <center>
          <div>
            <Formik
              initialValues={{
                searchWord: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.searchWord) {
                  errors.searchWord = "Required";
                }
                return errors;
              }}
              onSubmit={async (values) => {
                await this.props.searchChannels(values.searchWord);
              }}
            >
              {({ isSubmitting }) => (
                <div className="searchChannelsSearchArea">
                  <Form>
                    <center>
                      <div
                        className="field"
                        style={{ display: "inline-block" }}
                      >
                        <Field type="searchWord" name="searchWord" />
                        <ErrorMessage name="searchWord" component="div" />
                      </div>
                      <button type="submit" className="submit btn btn-primary">
                        search
                      </button>
                    </center>
                  </Form>
                </div>
              )}
            </Formik>
            <button
              className="btn btn-primary addSearchChannels"
              onClick={async () => {
                let arr = document.querySelectorAll(".searchChannelsCard");
                arr = [...arr];
                arr = arr.map((a, ind) => {
                  if (a.classList.contains("searchCchannelsCardSelection"))
                    return {
                      channelId: this.props.searchedChannels[ind].id,
                      name: this.props.searchedChannels[ind].snippet.title,
                      description: this.props.searchedChannels[ind].snippet
                        .description,
                      avatarDefault: this.props.searchedChannels[ind].snippet
                        .thumbnails.default.url,
                      avatarHigh: this.props.searchedChannels[ind].snippet
                        .thumbnails.high.url,
                      viewsCount: this.props.searchedChannels[ind].statistics
                        .viewCount,
                      subscribersCount: this.props.searchedChannels[ind]
                        .statistics.subscriberCount,
                      videoCount: this.props.searchedChannels[ind].statistics
                        .videoCount,
                    };
                  return 0;
                });
                arr = arr.filter((a) => a != 0);
                console.log("arr =>", arr);
                await this.props.addChannels(arr);
                await this.props.clearSearchedChannels();
              }}
            >
              Add
            </button>
          </div>
          <div className="renderSearchChannels">{this.renderChannels()}</div>
          {/* <center>
          
        </center> */}
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { searchedChannels: state.searchChannels };
};

export default connect(mapStateToProps, {
  searchChannels,
  addChannels,
  clearSearchedChannels,
})(Header);
