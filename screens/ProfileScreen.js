import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import PostingList from "../components/PostingList.js";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";
export default class ProfileScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: true,
      posts: [],
      error: null,
      userID: "",
      token: "",
      dname: "",
      fname: "",
      lname: "",
      bio: "",
      crowdfunding: "",
      profilePic: "",
      freelance: "",
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("user").then((userId) => {
      this.setState({
        userID: userId,
      });
      this.loadPosts(userId);
      this.getUsername(userId);
    });
    SecureStore.getItemAsync("session").then((sesh) => {
      this.setState({
        token: sesh,
      });
    });
    this.getUserArtifacts(
      "profilePic",
      "https://www.svgrepo.com/show/213315/avatar-profile.svg"
    );
    this.getUserArtifacts("bio", "Hey Update Me!");
    this.getUserArtifacts("crowdfunding", "Hey Update Me!");
    this.getUserArtifacts("freelance", "Hey Update Me");
  }

  loadPosts = (userId) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        userid: userId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.posts) {
            this.setState({
              isLoaded: true,
              posts: result.posts,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
    setTimeout(() => {
      this.loadPosts();
    }, 60000);
  };

  getUserArtifacts = (artifact_cat, artifact_item) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: this.state.userID,
        artifactcategory: artifact_cat,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user_artifacts === undefined) {
            return fetch(
              "http://stark.cse.buffalo.edu/cse410/atam/api/uacontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "addOrEditUserArtifacts",
                  user_id: this.state.userID,
                  userid: this.state.userID,
                  session_token: this.state.token,
                  artifacttype: "profileSettings",
                  artifactcategory: artifact_cat,
                  artifacturl: artifact_item,
                }),
              }
            )
              .then((resp) => resp.json())
              .then(
                (response) => {},
                (error) => {}
              );
          } else {
            if (artifact_cat === "profilePic") {
              this.setState({
                profilePic: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "bio") {
              this.setState({
                bio: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "crowdfunding") {
              this.setState({
                crowdfunding: result.user_artifacts[0].artifact_url,
              });
            } else if (artifact_cat === "freelance") {
              this.setState({
                freelance: result.user_artifacts[0].artifact_url,
              });
            }
          }
        },
        (error) => {}
      );
  };

  getUsername = (userid) => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: userid,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            dname: result.users[0].name,
            fname: result.users[0].first_name,
            lname: result.users[0].last_name,
          });
        },
        (error) => {}
      );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.topRow}>
              <View style={styles.profilePicContainer}>
                <Image
                  style={styles.profilePic}
                  source={{ uri: this.state.profilePic }}
                  resizeMode="cover"
                  alt="post"
                />
              </View>

              <View style={styles.name}>
                <Text style={styles.dname}>{this.state.dname}</Text>
                <Text style={styles.lname}>
                  <Text style={styles.fname}>{this.state.fname} </Text>
                  {this.state.lname}
                </Text>
              </View>
            </View>

            <Text style={styles.bio}>
              <Text style={{ fontWeight: "bold" }}>Bio: </Text>
              {this.state.bio}
            </Text>
            <Text style={styles.crowdfunding}>
              <Text style={{ fontWeight: "bold" }}>Crowdfunding: </Text>
              {this.state.crowdfunding}
            </Text>
            <Text style={styles.freelance}>
              <Text style={{ fontWeight: "bold" }}>Freelance: </Text>
              {this.state.freelance}
            </Text>
          </View>
          <PostingList
            posts={this.state.posts}
            error={this.state.error}
            isLoaded={this.state.isLoaded}
          />
        </View>
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  profileContainer: {
    flex: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#4C518C",
    padding: 20,
    justifyContent: "space-between",
  },
  profilePicContainer: {
    flex: 1,
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
  },
  topRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    flex: 1,
    alignItems: "flex-start",
  },
  dname: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  fname: {
    fontSize: 15,
    color: "white",
  },
  lname: {
    fontSize: 15,
    color: "white",
  },
  bio: {
    fontSize: 15,
    color: "white",
  },
  crowdfunding: {
    fontSize: 15,
    color: "white",
  },
  freelance: {
    fontSize: 15,
    color: "white",
  },
});
