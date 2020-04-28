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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initialize our login state
    this.state = {
      email: "",
      password: "",
    };

    // console.log(props);
  }
  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {
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
  render() {
    const { email, password } = this.state;

    // this could use some error handling!
    // the user will never know if the login failed.
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="Email Address"
          value={email}
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.onSubmit()}
        >
          <LinearGradient colors={["#da2c38", "#eca400"]} style={styles.grad}>
            <Text style={styles.btnText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  loginButton: {
    height: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 5,
    // alignItems: "center",
    // padding: 15,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
  },
  grad: {
    flex: 1,
    // height: 50,
    // width: 160,
    // alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    padding: 14,
  },
});
