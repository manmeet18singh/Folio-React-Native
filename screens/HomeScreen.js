import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MonoText } from "../components/StyledText";
import PostingList from "../components/PostingList.js";

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: true,
      posts: [],
      error: null,
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    fetch("http://stark.cse.buffalo.edu/cse410/atam/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
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

  render() {
    return (
      <View style={styles.container}>
        <PostingList
          posts={this.state.posts}
          error={this.state.error}
          isLoaded={this.state.isLoaded}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: 20,
  },
  // card: {
  //   width: "100%",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 2,
  //   elevation: 2,
  //   backgroundColor: "white",
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // cardTitle: {
  //   fontSize: 20,
  //   marginBottom: 10,
  // },
  // cardDescription: {
  //   fontSize: 12,
  // },
});
