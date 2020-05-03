import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-community/picker";

export default class NewPostScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      caption: "",
      tag: "",
      url: "",
      isDisabled: true,
      completedTitle: "",
      completedCaption: "",
      completedTag: "",
      errorTitle: "",
      errorCaption: "",
      errorTag: "",
      errorUrl: "",
    };
  }

  validate(text) {
    let url = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;
  }

  createPost = () => {
    // this.state.title = this.state.title.concat("~@~");
    // this.state.caption = this.state.title.concat(this.state.caption);
    // //keep the form from actually submitting
    // if (formValid(this.state)) {
    //   //make the api call to the authentication page
    //   fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
    //     method: "post",
    //     body: JSON.stringify({
    //       action: "addOrEditPosts",
    //       user_id: sessionStorage.getItem("user"),
    //       userid: sessionStorage.getItem("user"),
    //       session_token: sessionStorage.getItem("token"),
    //       posttext: this.state.caption,
    //       postpicurl: this.state.url,
    //       posttype: this.state.tag,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         this.setState({
    //           apiReturnMessage: result.Status,
    //           // post_id: result.Status.slice(-2)
    //         });
    //         // this.addTitle();
    //         // this.addTag();
    //         this.props.loadPosts();
    //         this.onClose();
    //         // window.location.reload(false);
    //       },
    //       (error) => {}
    //     );
    // }
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
            style={[
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
              !this.state.completedTitle ? styles.inputError : null,
            ]}
            placeholder="URL"
            onChangeText={(text) => this.validate(text, "url")}
          />
          <Text style={styles.errorMessage}>{this.state.errorUrl}</Text>
        </View>
        <View style={styles.submitButton}>
          <TouchableOpacity
            disabled={this.state.isDisabled}
            style={styles.button}
            onPress={this.createPost()}
          >
            <Text style={styles.buttonText}>POST</Text>
          </TouchableOpacity>
        </View>
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
  submitButton: {},
  errorMessage: {},
  input: {
    height: 50,
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputError: {},
  button: {},
  buttonText: {},
  errorTitle: {},
  errorCaption: {},
  errorTag: {},
  errorUrl: {},
});
