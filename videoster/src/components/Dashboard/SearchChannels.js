import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { ErrorMessage, Field, Form, Formik } from "formik";

import { searchChannels, addChannels } from "../../actions/index";
import { connect } from "react-redux";

import history from "../../history";

class Header extends React.Component {

  renderChannels = () => {
    return (
      this.props.searchedChannels.map((channel, ind) => {
        return (
          <div
            key={ind}
            className="searchChannelsCard"
            onClick={(event) => {
              event.currentTarget.classList.toggle('searchCchannelsCardSelection');
            }}
          >
            <img src={channel.snippet.thumbnails.high.url} alt="Avatar" className="searchChannelsCardAvatar" />
            <p className="searchChannelCardTitle" >{channel.snippet.title}</p>
            <p>{channel.snippet.description}</p>
            <p>{channel.statistics.subscriberCount}</p>
            <p>{channel.statistics.videoCount}</p>
            <p>{channel.statistics.viewCount}</p>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <div>
          <Formik
            initialValues={{
              searchWord: ''
            }}
            validate={values => {
              const errors = {};
              if (!values.searchWord) {
                errors.searchWord = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              await this.props.searchChannels(values.searchWord);
            }}
          >
            {({ isSubmitting }) => (
              <div >
                <Form>
                  <div className="field">
                    searchWord
                  <Field type="searchWord" name="searchWord" />
                    <ErrorMessage name="searchWord" component="div" />
                  </div>
                  <button type="submit" className="submit btn btn-primary">
                    search
                </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div>
          {this.renderChannels()}
        </div>
        <div>
          <button onClick={async() => {
            let arr = document.querySelectorAll('.searchChannelsCard');
            arr = [...arr];
            arr = arr.map((a, ind) => {
              if (a.classList.contains('searchCchannelsCardSelection')) return {
                channelId: this.props.searchedChannels[ind].id,
                name: this.props.searchedChannels[ind].snippet.title,
                description: this.props.searchedChannels[ind].snippet.description,
                avatarDefault: this.props.searchedChannels[ind].snippet.thumbnails.default.url,
                avatarHigh: this.props.searchedChannels[ind].snippet.thumbnails.high.url,
                viewsCount: this.props.searchedChannels[ind].statistics.viewCount,
                subscribersCount: this.props.searchedChannels[ind].statistics.subscriberCount,
                videoCount: this.props.searchedChannels[ind].statistics.videoCount,
              }
              return 0;
            })
            arr = arr.filter((a) => (a != 0));
            await this.props.addChannels(arr);
          }}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { searchedChannels: state.searchChannels };
}

export default connect(mapStateToProps, { searchChannels, addChannels })(Header);