import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      caption: "",
      collab: "",
    };
    this.post = React.createRef();
  }

  getTitle = () => {
    var separator = this.props.post.post_text.indexOf("~@~");
    this.state.title = this.props.post.post_text.substring(0, separator);
    return this.state.title;
  };

  getCaption = () => {
    var titleSep = this.props.post.post_text.indexOf("~@~");
    var collabSep = this.props.post.post_text.indexOf("~*~");
    if (collabSep !== -1) {
      //Some Collabs
      this.state.caption = this.props.post.post_text.substring(
        titleSep + 3,
        collabSep
      );
      return this.state.caption;
    } else {
      //No collabs
      this.state.caption = this.props.post.post_text.substring(
        titleSep + 3,
        this.props.post.post_text.length
      );
      return this.state.caption;
    }
  };
  getCollab = () => {
    var collabSep = this.props.post.post_text.indexOf("~*~");
    if (collabSep !== -1) {
      //Some Collabs
      this.state.collab = this.props.post.post_text.substring(
        collabSep + 3,
        this.props.post.post_text.length
      );
      return this.state.collab;
    } else {
      //No collabs
      return "";
    }
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.postText}>{this.props.post.name}</Text>
        </View>
        <Image
          style={styles.postImg}
          source={{ uri: this.props.post.post_pic_url }}
          resizeMode="cover"
          alt="post"
        />
        <View>
          <View style={styles.title}>
            <Text style={styles.postTitle}>{this.getTitle()}</Text>
          </View>
          <View style={styles.caption}>
            <Text style={styles.postText}>{this.getCaption()}</Text>
          </View>
          <View style={[this.state.collab == "" ? styles.noDisplay : null]}>
            <Text style={styles.postText}>
              <Text style={styles.postCollab}>Collaborators: </Text>
              {this.getCollab()}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.postText}>
              <Text style={styles.tag}># </Text>
              {this.props.post.post_type}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  cardHeader: {
    marginBottom: 5,
  },
  title: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  tag: {
    fontWeight: "bold",
  },
  caption: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
  },
  postImg: {
    width: null,
    height: 250,
    borderRadius: 6,
  },
  postText: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  noDisplay: {
    display: "none",
  },
  postCollab: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  showCollab: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
  },
});
