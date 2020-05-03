import * as React from "react";
import { StyleSheet, View } from "react-native";

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
    }, 5000);
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
});
