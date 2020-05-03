import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";

export default class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      validEmail: true,
      errorMessage: "",
      password: "",
      loginMessage: "",
      otp: "",
      confirmpass: "",
    };
  }
  validate(text, confirmPass, type) {
    let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (type == "email") {
      if (emailRegex.test(text)) {
        this.setState({
          validEmail: true,
          errorMessage: "",
          email: text,
        });
      } else {
        this.setState({
          validEmail: false,
          errorMessage: "Invalid Email",
          email: "",
        });
      }
    } else {
      if (text == confirmPass) {
        this.setState({
          errorMessage: "",
          password: text,
          confirmpass: confirmPass,
        });
      } else {
        this.setState({
          errorMessage: "Your Passwords Don't Match",
          password: "",
          confirmpass: "",
        });
      }
    }
  }

  setPass = () => {
    //keep the form from actually submitting

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "setpassword",
        email_addr: this.state.email,
        token: this.state.otp,
        newpassword: this.state.password,
        confirmpassword: this.state.confirmpass,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "login",
                username: this.state.email,
                password: this.state.password,
              }),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              if (result.user) {
                SecureStore.setItemAsync(
                  "session",
                  result.user.session_token
                ).then(() => {
                  SecureStore.setItemAsync("user", result.user.user_id).then(
                    () => {
                      this.props.route.params.onLoggedIn();
                      this.props.navigation.navigate("Root");
                    }
                  );
                });
              } else {
                this.setState({
                  loginMessage: result.message,
                });
              }
            });
        },
        (error) => {}
      );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TextInput
          style={[
            styles.input,
            !this.state.validEmail ? styles.inputError : null,
          ]}
          onChangeText={(text) => this.validate(text)}
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="OTP"
        />
        <Text style={styles.errorMessage}>{this.state.loginMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
        />
        <Text style={styles.errorMessage}>{this.state.loginMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Confirm Password"
          textContentType="password"
          secureTextEntry={true}
        />
        <Text style={styles.errorMessage}>{this.state.loginMessage}</Text>
        <KeyboardAvoidingView style={styles.buttonContainer}>
          <LinearGradient
            colors={["#eca400", "#da2c38"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.loginBtn}
          >
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => this.login()}
            >
              <Text style={styles.loginText}>Let's Start!</Text>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 30,
  },
  logo: {
    alignSelf: "center",
    width: 210,
    height: 130,
    resizeMode: "contain",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: "#DA2C38",
  },
  errorMessage: {
    color: "#DA2C38",
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  loginContainer: {
    width: "98%",
    height: "85%",
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
  },
  loginText: {
    textAlign: "center",
    color: "#eca400",
    padding: 6,
    fontSize: 20,
  },
  loginBtn: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  forgot: {
    padding: 25,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
