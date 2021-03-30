import React from "react";

import { varifyEmail } from "../../actions/index";
import { connect } from "react-redux";

class VarifyEmail extends React.Component {
  async componentDidMount() {
    {
      await this.props.varifyEmail({
        token: window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ],
      });
    }
  }
  render() {
    return <div></div>;
  }
}

export default connect(null, { varifyEmail })(VarifyEmail);
