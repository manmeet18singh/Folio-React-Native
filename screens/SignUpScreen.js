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

export default class SignUpScreen extends React.Component {
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

  createAccount = () => {
    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        emailaddr: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.users) {
          this.setState({
            errorMessage: "A user with that email already exists!",
          });
        } else {
          return fetch(
            "http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "register",
                email_addr: this.state.email,
              }),
            }
          )
            .then((resp) => resp.json())
            .then((response) => {
              this.setState({
                successMessage: response.message,
              });
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.tagline}>
          Sign up and start your very own professional portfolio
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
          {/* LOGIN BUTTON */}
          <LinearGradient
            colors={["#eca400", "#da2c38"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.loginBtn}
          >
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* SIGN UP */}
          <LinearGradient
            colors={["#3399CC", "#4C518C"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.signUpBtn}
          >
            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => this.createAccount()}
            >
              <Text style={styles.signUpText}>SIGN UP</Text>
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
    justifyContent: "space-between",
    paddingTop: 10,
  },
  signUpContainer: {
    width: "95%",
    height: "85%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  loginContainer: {
    width: "95%",
    height: "85%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  signUpText: {
    textAlign: "center",
    color: "#3399CC",
    padding: 6,
    fontSize: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#eca400",
    padding: 6,
    fontSize: 20,
  },
  loginBtn: {
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  signUpBtn: {
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});
