// import * as React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Button,
// } from "react-native";
// import { Image } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import { LinearGradient } from "expo-linear-gradient";

// export default class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   login = () => {
//     const { email, password } = this.state;

//     fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
//       method: "POST",
//       body: JSON.stringify({
//         action: "login",
//         username: email,
//         password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(
//           `Logging in with session token: ${json.user.session_token}`
//         );

//         // enter login logic here
//         SecureStore.setItemAsync("session", json.user.session_token).then(
//           () => {
//             this.props.route.params.onLoggedIn();
//           }
//         );
//       });
//   };

//   forgotPass = () => {};

//   render() {
//     const { email, password } = this.state;
//     return (
//
//     );
//   }
// }

// // Our stylesheet, referenced by using styles.container or styles.loginText (style.property)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fafafa",
//     padding: 30,
//   },
//   logo: {
//     // flex: 1,
//     alignSelf: "center",
//     width: 210,
//     height: 130,
//     resizeMode: "contain",
//     marginBottom: 40,
//   },
//   input: {
//     height: 50,
//     borderColor: "#DBDBDB",
//     borderWidth: 1,
//     marginBottom: 20,
//     borderRadius: 5,
//     padding: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//   },
//   loginContainer: {
//     width: "98%",
//     height: "85%",
//     borderRadius: 6,
//     backgroundColor: "white",
//     alignItems: "center",
//   },
//   loginText: {
//     textAlign: "center",
//     color: "#eca400",
//     padding: 6,
//     fontSize: 20,
//   },
//   loginBtn: {
//     height: 50,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     alignSelf: "flex-end",
//   },
//   forgot: {
//     padding: 25,
//     alignSelf: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
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

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      validEmail: true,
      errorMessage: "",
      password: "",
      loginMessage: "",
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

  login = () => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({
        action: "login",
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user) {
          console.warn(this.props.route);
          SecureStore.setItemAsync("session", result.user.session_token).then(
            () => {
              SecureStore.setItemAsync("user", result.user.user_id);
              this.props.route.params.onLoggedIn();
            }
          );
        } else {
          this.setState({
            loginMessage: result.message,
          });
        }
      });
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
          placeholder="Password"
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
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAvoidingView>
        <Text
          style={styles.forgot}
          onPress={() => this.props.navigation.navigate("Forgot Password")}
        >
          Forgot Password?
        </Text>
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
