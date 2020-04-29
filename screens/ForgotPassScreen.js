import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

export default class ForgotPassScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initialize our login state
    this.state = {
      email: "",
      password: "",
    };

    // console.log(props);
  }

  // validate = (inputed, type) => {
  //   if (type == "email") {
  //   }
  //   else if (type == "password")
  // };

  login = () => {
    const { email, password } = this.state;

    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username: email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(
          `Logging in with session token: ${json.user.session_token}`
        );

        // enter login logic here
        SecureStore.setItemAsync("session", json.user.session_token).then(
          () => {
            this.props.route.params.onLoggedIn();
          }
        );
      });
  };

  forgotPass = () => {};

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.validate(text, "email")}
          placeholder="Email Address"
          value={email}
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.validate(text, "password")}
          placeholder="Password"
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#3399CC", "#4C518C"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.signUpBtn}
          >
            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => this.onSubmit()}
            >
              <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["#eca400", "#da2c38"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.loginBtn}
          >
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => this.onSubmit()}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Button
          title="Forgot Password?"
          onPress={() => this.props.navigation.navigate("ForgotPassScreen")}
        />
      </View>
    );
  }
}

// Our stylesheet, referenced by using styles.container or styles.loginText (style.property)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 30,
  },
  logo: {
    // flex: 1,
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
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  forgot: {
    padding: 30,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
