import React, { Component } from "react";
import PropTypes from "prop-types";
import {View,Text,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { userRequestLogout,userInfo } from "../LoginContainer/redux/actions";
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from "./styles";

const lockIcon = require("../../../assets/icon/lock.png");
const mailIcon = require("../../../assets/icon/mail.png");

class ProfileForm extends Component {
    logout() {
        console.log(this.props.auth.access_token);
        this.props.userInfo();
        this.props.userLogout();
        this.props.navigation.navigate("Login");
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
ProfileForm.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userRequestLogout()),
    userInfo: () => dispatch(userInfo()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileForm);
