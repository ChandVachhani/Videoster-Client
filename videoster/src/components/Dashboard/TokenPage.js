import { connect } from "react-redux";
import React from "react";

import history from "../../history";

import { getTokens, clearTokens } from "../../actions/index";

class TokenPage extends React.Component {
  async componentDidMount() {
    await this.props.clearTokens();
    await this.props.getTokens();
  }
  renderCategories = () => {
    return Object.keys(this.props.tokens).map((token) => {
      return (
        <button
          className="submit"
          style={{ width: "200px" }}
          onClick={async () => {
            navigator.clipboard.writeText(this.props.tokens[token]).then(
              function () {
                window.alert("Successfull");
              },
              function (err) {
                console.log(err);
                window.alert("failed");
              }
            );
          }}
        >
          {token.toUpperCase()}
        </button>
      );
    });
  };

  render() {
    return (
      <div className="landingplace--body">
        <button
          className="submit"
          style={{ width: "200px", position: "absolute", right: "2%" }}
          onClick={async () => {
            await this.props.clearTokens();
            history.push("/Dashboard");
          }}
        >
          Back
        </button>
        <br />
        <br />
        <center>
          <div className="category--collection">
            <div style={{ display: "inline-block" }}>
              <h4
                className="appName"
                style={{ display: "inline-block", color: "white" }}
              >
                &nbsp;&nbsp;Welcome{" "}
                <span style={{ color: "#2ecc71", display: "inline-block" }}>
                  {this.props.user.userName.toUpperCase()}
                </span>
                !,{" "}
                <div style={{ display: "inline-block" }}>
                  {" "}
                  Where do you want to Land?
                </div>
              </h4>
            </div>
            <br />
            {this.renderCategories()}
          </div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tokens: state.tokens, user: state.user };
};

export default connect(mapStateToProps, { getTokens, clearTokens })(TokenPage);
