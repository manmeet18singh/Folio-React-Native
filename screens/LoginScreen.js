import * as React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Logo from "../assets/images/logo.svg";
import { Image } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initialize our login state
    this.state = {
      email: "",
      password: "",
    };

    console.log(props);
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
        <Logo />
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <Button title="Submit" onPress={() => this.onSubmit()} />
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
  loginText: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});
