import { connect } from "react-redux";
import React from "react";

import history from "../../history";

import { clearTokenData } from "../../actions/index";
import { Col, Row, Image } from "react-bootstrap";

import NoDataAvailable from "./assets/images/Nodata2.svg";

class ImportData extends React.Component {
  renderChannels = (category) => {
    return this.props.tokenData[category].map((channel, ind) => {
      return (
        <div className={`channel`}>
          <Image
            className={`channelIcon ${category.toUpperCase()}--tokenChannels`}
            src={channel.avatarDefault}
            onClick={(event) => {
              event.currentTarget.classList.toggle("changeBorderRadius");
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderRadius = "25%";
            }}
            onMouseLeave={(event) => {
              if (!event.currentTarget.classList.contains("changeBorderRadius"))
                event.currentTarget.style.borderRadius = "50%";
            }}
          />
        </div>
      );
    });
  };
  renderCategories = () => {
    return Object.keys(this.props.tokenData).map((data) => {
      return (
        <Row>
          <Col lg={3}>
            <button
              className="submit tokenCategories"
              style={{
                width: "200px",
                display: "inline-block",
              }}
              onClick={async (event) => {
                event.currentTarget.classList.toggle("fillbtn");
              }}
            >
              {data.toUpperCase()}
            </button>
          </Col>
          <Col>
            {this.renderChannels(data)}
            <hr
              style={{
                color: "white",
                borderColor: "white",
                marginRight: "2%",
              }}
            />
          </Col>
        </Row>
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
            await this.props.clearTokenData();
            history.push("/Dashboard");
          }}
        >
          Cancel
        </button>
        <button
          className="submit"
          style={{ width: "200px", position: "absolute", left: "2%" }}
          onClick={async () => {
            let arr = [...document.querySelectorAll(".tokenCategories")];
            for (let ind in arr) {
              const a = arr[ind];
              if (a.classList.contains("fillbtn")) {
                const ok = true; //await this.props.addCategory(a.textContent);
                if (ok) {
                  let channels = [
                    ...document.querySelectorAll(
                      `.${a.textContent}--tokenChannels`
                    ),
                  ];
                  for (let i in channels) {
                    const b = channels[i];
                    if (b.classList.contains("changeBorderRadius")) {
                      console.log(b);
                    }
                  }
                  // await this.props.addChannels(channels);
                }
              }
            }
            // await this.props.clearTokenData();
            // history.push("/Dashboard");
          }}
        >
          Add
        </button>
        <br />
        <br />
        <center>
          {Object.keys(this.props.tokenData).length == 0 ? (
            <div style={{ color: "white" }}>
              <img
                style={{ width: "35vw" }}
                src={NoDataAvailable}
                alt="No data available"
              />
            </div>
          ) : (
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
              <br />
              <br />
              {this.renderCategories()}
            </div>
          )}
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tokens: state.tokens, user: state.user, tokenData: state.tokenData };
};

export default connect(mapStateToProps, { clearTokenData })(ImportData);
