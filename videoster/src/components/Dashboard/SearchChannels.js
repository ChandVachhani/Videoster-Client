import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { ErrorMessage, Field, Form, Formik } from "formik";

import {
  searchChannels,
  addChannels,
  clearSearchedChannels,
  clearChannelsRelatedStates,
} from "../../actions/index";
import { connect } from "react-redux";

class Header extends React.Component {
  renderChannels = () => {
    return this.props.searchedChannels.map((channel, ind) => {
      return (
        <div
          className="searchChannelsCard version-photo"
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
            onMouseEnter={(event) => {
              event.currentTarget.classList.add("makeBig");
            }}
            onMouseLeave={(event) => {
              event.currentTarget.classList.remove("makeBig");
            }}
          />
        </div>
      );
    });
  };

  renderData = () => {
    return this.props.searchedChannels.map((channel, ind) => {
      return (
        <div
          className="searchChannelsCard version-data"
          style={{ color: "white" }}
          onClick={(event) => {
            event.currentTarget.classList.toggle(
              "searchCchannelsCardSelection"
            );
          }}
        >
          <div className="data-title">
            <center>
              <div>{channel.snippet.title}</div>
            </center>
          </div>
          <div className=" data-1">
            <div>{channel.statistics.subscriberCount}</div>
            <div>Subs</div>
          </div>
          <div className=" data-2">
            <div>{channel.statistics.videoCount}</div>
            <div>Videos</div>
          </div>
          <div className=" data-3">
            <div>{channel.statistics.viewCount}</div>
            <div>Views</div>
          </div>
        </div>
      );
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
                let arr = document.querySelectorAll(".version-photo");
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

                await this.props.addChannels(arr);
                await this.props.clearSearchedChannels();
              }}
            >
              Add
            </button>
          </div>
          <div className="renderSearchChannels">{this.renderData()}</div>
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
  clearChannelsRelatedStates,
})(Header);
