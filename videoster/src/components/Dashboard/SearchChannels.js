import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { ErrorMessage, Field, Form, Formik } from "formik";

import history from "../../history";

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
      console.log(channel.snippet.thumbnails.high.url);
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
        <button
          className="submit"
          style={{ width: "200px", position: "absolute", right: "2%" }}
          onClick={async (event) => {
            history.push("/Dashboard");
            await this.props.clearSearchedChannels();
          }}
        >
          Back
        </button>
        <br />
        <br />
        <br />
        <br />
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
                document.querySelector(".searchChannel-spinner").style.display =
                  "inline-block";
                await this.props.searchChannels(values.searchWord);
                const inputFIeld = document.querySelector(
                  ".special--field--input"
                );
                inputFIeld.blur();
                document.querySelector(".searchChannel-spinner").style.display =
                  "none";
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
                        <Field
                          className="field--input special--field--input"
                          type="searchWord"
                          name="searchWord"
                          placeholder="Search..."
                          autoComplete="off"
                        />
                        {/* <ErrorMessage name="searchWord" component="div" /> */}
                      </div>
                      <button type="submit" className="submit">
                        <div
                          class="spinner-grow text-success searchChannel-spinner"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            display: "none",
                          }}
                          role="status"
                        ></div>
                        &nbsp; Search
                      </button>
                    </center>
                  </Form>
                </div>
              )}
            </Formik>
            <button
              className="submit"
              onClick={async () => {
                document.querySelector(".addChannel-spinner").style.display =
                  "inline-block";
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
              <div
                class="spinner-grow text-success addChannel-spinner"
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "none",
                }}
                role="status"
              ></div>
              &nbsp; Add
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
