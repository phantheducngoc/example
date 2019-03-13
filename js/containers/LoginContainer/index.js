import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Alert } from "react-native";
import { Item, Input, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Login from "../../components/Login";
import {  userLogin } from "../LoginContainer/redux/actions";
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from "./styles";

const lockIcon = require("../../../assets/icon/lock.png");
const mailIcon = require("../../../assets/icon/mail.png");

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps, nextState) {

        if (this.props.auth.isFailed !== nextProps.auth.isFailed) {
            if (nextProps.auth.isFailed && !nextProps.auth.isAuthenticating) {
                let message = nextProps.auth.message;
                setTimeout(() => {
                    Alert.alert("", message);
                }, 100);
            }
        }
        if (this.props.auth.access_token !== nextProps.auth.access_token) {
            if (nextProps.auth.access_token) {
                this.props.navigation.navigate("App");
            }
        }
    }

    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        return (
            <Item error={error && touched} style={styles.itemForm}>
                <Image source={input.name === "email" ? mailIcon : lockIcon} />
                <Input
                    ref={c => (this.textInput = c)}
                    placeholder={input.name === "email" ? "Email VNPT" : "Mật khẩu"}
                    secureTextEntry={input.name === "password"}
                    {...input}
                    style={styles.inputText}
                    keyboardType={input.name === "email" ? "email-address" : "default"}
                    autoCapitalize="none"
                />
            </Item>
        );
    }

    login() {
        console.log(this.props.auth.access_token,this.props.valid);
        if (this.props.valid) {
            //let { email, password} = this.props.loginForm.values;        
            let { email = 'anhlv.dng@vnpt.vn', password = 'Vnpt#123' } = {};
            this.props.login({ email, password });
        } else {
            Toast.show({
                text: "Thông tin không đúng!",
                duration: 2000,
                position: "top",
                textStyle: { textAlign: "center" }
            });
        }
    }

    render() {
        const form = (
            <Form>
                <Field
                    name="email"
                    component={this.renderInput}
                //validate={[emailFormat, required]}
                />
                <Field
                    name="password"
                    component={this.renderInput}
                //validate={[alphaNumeric, required]}
                />
            </Form>
        );
        return (
            <Login
                navigation={this.props.navigation}
                loading={this.props.auth.isAuthenticating}
                loginForm={form}
                onLogin={() => this.login()}
            />
        );
    }
}

LoginForm.propTypes = {
    auth: PropTypes.object,
    loginForm: PropTypes.object,
    login: PropTypes.func
};

const LoginContainer = reduxForm({
    form: "login"
})(LoginForm);

const mapStateToProps = state => ({
    auth: state.auth,
    loginForm: state.form.login,
});

const mapDispatchToProps = dispatch => ({
    login: ({ email, password }) => dispatch(userLogin({
        email,
        password,
    })),   
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);
