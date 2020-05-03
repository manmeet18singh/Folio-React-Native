import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-community/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";

export default class NewPostScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      userID: "",
      token: "",
      title: "",
      caption: "",
      tag: "",
      url: "",
      isDisabled: true,
      completedTitle: true,
      completedCaption: true,
      completedTag: true,
      completedUrl: true,
      validUrl: true,
      errorTitle: "",
      errorCaption: "",
      errorTag: "",
      errorUrl: "",
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("user").then((userId) => {
      this.setState({
        userID: userId,
      });
    });
    SecureStore.getItemAsync("session").then((sesh) => {
      this.setState({
        token: sesh,
      });
    });
  }

  validate(text, type) {
    let url = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;

    if (type == "title") {
      if (text != "") {
        this.setState({
          completedTitle: true,
          errorTitle: "",
          title: text,
        });
      } else {
        this.setState({
          completedTitle: false,
          errorTitle: "Can't Leave Blank",
          title: "",
        });
      }
    } else if (type == "caption") {
      if (text != "") {
        this.setState({
          completedCaption: true,
          errorCaption: "",
          caption: text,
        });
      } else {
        this.setState({
          completedCaption: false,
          errorCaption: "Can't Leave Blank",
          caption: "",
        });
      }
    } else if (type == "tag") {
      if (text != "") {
        this.setState({
          completedTag: true,
          errorTag: "",
          tag: text,
        });
      } else {
        this.setState({
          completedTag: false,
          errorTag: "Can't Leave Blank",
          tag: "",
        });
      }
    } else if (type == "url") {
      if (text != "") {
        this.setState({
          completedUrl: true,
        });
        if (url.test(text)) {
          this.setState({
            validUrl: true,
            errorUrl: "",
            url: text,
          });
        } else {
          this.setState({
            validUrl: false,
            errorUrl: "Invalid URL",
            url: "",
          });
        }
      } else {
        this.setState({
          completedUrl: false,
          errorUrl: "Can't Leave Blank",
          url: "",
        });
      }
    }
  }

  createPost = () => {
    //keep the form from actually submitting
    this.state.title = this.state.title.concat("~@~");
    this.state.caption = this.state.title.concat(this.state.caption);

    if (
      this.state.completedTitle &&
      this.state.completedCaption &&
      this.state.completedTag &&
      this.state.completedUrl &&
      this.state.validUrl
    ) {
      //make the api call to the authentication page
      fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditPosts",
          user_id: this.state.userID,
          userid: this.state.userID,
          session_token: this.state.token,
          posttext: this.state.caption,
          postpicurl: this.state.url,
          posttype: this.state.tag,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.props.navigation.navigate("Home");
          },
          (error) => {}
        );
    } else {
      this.setState({
        errorUrl: "Can't leave fields empty",
      });
    }
  };

  render() {
    return (
      <View style={styles.formBody}>
        <View style={styles.dataInput}>
          <Text style={styles.dataLabel}>Name of the Project: </Text>
          <TextInput
            style={[
              styles.input,
              !this.state.completedTitle ? styles.inputError : null,
            ]}
            placeholder="Project Name"
            onChangeText={(text) => this.validate(text, "title")}
          />
          <Text style={styles.errorMessage}>{this.state.errorTitle}</Text>
        </View>

        <View style={styles.dataInput}>
          <Text style={styles.dataLabel}>Caption: </Text>
          <TextInput
            style={[
              styles.input,
              !this.state.completedCaption ? styles.inputError : null,
            ]}
            placeholder="What's This Project About?"
            onChangeText={(text) => this.validate(text, "caption")}
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.errorMessage}>{this.state.errorCaption}</Text>
        </View>

        <View style={styles.dataInput}>
          <Text style={styles.dataLabel}>Collaborators: </Text>
          <TextInput
            style={styles.input}
            placeholder="Collaborators (Optional)"
            onChangeText={(text) => this.validate(text, "collab")}
          />
        </View>

        <View style={styles.dataInput}>
          <Text style={styles.dataLabel}>Tags: </Text>
          <Picker
            selectedValue={this.state.tag}
            tyle={[
              styles.input,
              !this.state.completedTag ? styles.inputError : null,
            ]}
            onValueChange={(itemValue) => this.validate(itemValue, "tag")}
          >
            <Picker.Item label="Select..." value="" />
            <Picker.Item label="Art" value="Art" />
            <Picker.Item label="Code" value="Code" />
            <Picker.Item label="Music" value="Music" />
            <Picker.Item label="Film" value="Film" />
            <Picker.Item label="Writing" value="Writing" />
          </Picker>
          <Text style={styles.errorMessage}>{this.state.errorTag}</Text>
        </View>

        <View style={styles.dataInput}>
          <Text style={styles.dataLabel}>URL To Picture: </Text>
          <TextInput
            style={[
              styles.input,
              !this.state.completedUrl && !this.validUrl
                ? styles.inputError
                : null,
            ]}
            placeholder="URL"
            onChangeText={(text) => this.validate(text, "url")}
          />
          <Text style={styles.errorMessage}>{this.state.errorUrl}</Text>
        </View>
        <LinearGradient
          colors={["#eca400", "#da2c38"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.postBtn}
        >
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => this.createPost()}
            // disabled={
            //   this.state.completedTitle &&
            //   this.state.completedCaption &&
            //   this.state.completedTag &&
            //   this.state.completedUrl &&
            //   this.state.validUrl
            // }
          >
            <Text style={styles.postBtnText}>POST</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

NewPostScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  formBody: {
    flex: 1,
    padding: 30,
  },
  dataInput: {
    marginTop: 5,
    marginBottom: 5,
  },
  dataLabel: {
    fontSize: 15,
    marginBottom: 10,
  },
  errorMessage: {
    color: "#DA2C38",
    padding: 5,
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
  postContainer: {
    width: "98%",
    height: "85%",
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
  },
  postBtnText: {
    textAlign: "center",
    color: "#eca400",
    padding: 6,
    fontSize: 20,
  },
  postBtn: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
