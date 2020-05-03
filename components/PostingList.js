import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import Post from "./Post";

export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      posts: [],
    };
  }

  render() {
    //this.loadPosts();
    const { error, isLoaded, posts } = this.props;
    if (error) {
      return <Text>Error: {error.message} </Text>;
    } else if (!isLoaded) {
      return <Text> </Text>;
    } else {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {posts.map((post) => (
            <Post key={post.post_id} post={post} type={this.props.type} />
          ))}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: 20,
  },
});
