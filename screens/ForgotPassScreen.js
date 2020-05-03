import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class ForgotPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      validEmail: true,
      errorMessage: "",
      successMessage: "",
    };
  }
  validate(text) {
    let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
        email: text,
      });
    }
  }

  forgotPassword = () => {
    //keep the form from actually submitting
    event.preventDefault();
    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "forgotpassword",
        email_addr: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            errorMessage: result.message,
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
        <Text style={styles.tagline}>
          Forgot Your Password?{"\n"} No Problem!
        </Text>
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
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding">
          {/* otp BUTTON */}
          <LinearGradient
            colors={["#3399CC", "#4C518C"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.otpBtn}
          >
            <TouchableOpacity
              style={styles.otpContainer}
              onPress={() => this.forgotPassword()}
            >
              <Text style={styles.otpText}>SEND OTP</Text>
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
  tagline: {
    paddingBottom: 25,
    fontSize: 20,
    textAlign: "center",
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
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  otpContainer: {
    width: "98%",
    height: "85%",
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
  },
  otpText: {
    textAlign: "center",
    color: "#3399CC",
    padding: 6,
    fontSize: 20,
  },
  otpBtn: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
