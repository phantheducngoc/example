import React, { Component } from "react";
import Loading from "../../components/Loading";
import { connect } from "react-redux";

class LoadingContainer extends Component {
  componentDidMount(){           
    if (this.props.auth.access_token!=null)
    {
      console.log(this.props.auth.access_token);
      this.props.navigation.navigate("App");
    }
    else
    {
      console.log(this.props.auth.access_token);
      this.props.navigation.navigate("Login");
    }    
  }
  render() {
    return (
      <Loading navigation={this.props.navigation}/>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})


export default connect(
  mapStateToProps,
  null
)(LoadingContainer);
