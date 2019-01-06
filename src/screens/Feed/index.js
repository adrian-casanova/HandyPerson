import React, { Component } from 'react';
import { View, RefreshControl } from 'react-native';
import { Appbar, FAB, Portal } from 'react-native-paper';
import { deviceHeight, deviceWidth, primaryRed } from '../../styles'
import Post from './components/Post';
import SearchBar from './components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllPosts } from '../../services/PostingService';
import { AppProviderConsumer } from '../../../App';
import FeedPost from './components/FeedPost';
import ImagePreview from './components/ImagePreview';

const styles = {
  container: {
    width: deviceWidth,
    height: deviceHeight
  },
  headerContainer: {
    backgroundColor: primaryRed
  },
  fabContainer: {
    backgroundColor: primaryRed
  },
  scrollView: {
    height: deviceHeight / 1.5
  }
}
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabOpen: false,
      feedArray: [],
      refreshing: false,
      imagePreviewOpen: false,
      previewImage: ''
    };
  }

  componentDidMount() {
    const feed = [];
    getAllPosts()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          feed.push(doc.data());
        });
        this.setState({
          feedArray: feed
        });
      })
      .catch(e => console.log('e: ', e));
  }

  handleRefresh = () => {
    const feed = [];
    getAllPosts()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          feed.push(doc.data());
        });
        this.setState({
          feedArray: feed,
          refreshing: false
        });
      })
      .catch((e) =>  {
        this.setState({
          refreshing: false
        });
        console.log('e: ', e);
      });
  }

  handleOpenPicturePreview = (previewImage) => {
    this.setState({
      imagePreviewOpen: true,
      previewImage
    });
  }

  handleClosePreview = () => {
    this.setState({
      imagePreviewOpen: false
    })
  }

  render() {
    const { feedArray, refreshing, imagePreviewOpen, previewImage } = this.state; 
    console.log('array: ', feedArray);
    return (
      <AppProviderConsumer>
        {({ userEmail, userName }) => {
          return (
          <View style={styles.container}>
          <ImagePreview
            imagePreviewOpen={imagePreviewOpen}
            imageSource={previewImage}
            handleClosePreview={this.handleClosePreview}
          />
          <Appbar.Header style={styles.headerContainer}>
            <Appbar.Action icon="filter-list"/>
            <Appbar.Action icon="apps"/>
            <SearchBar />
          </Appbar.Header>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
              />
            }
          >
            {feedArray.map((item) => (
              <FeedPost
                key={item.title}
                postTitle={item.title}
                postedBy={item.postedBy}
                postDescription={item.description}
                cost={item.cost}
                handleOpenPicturePreview={this.handleOpenPicturePreview}
                firstImage={item.imageUrls[0]}
                secondImage={item.imageUrls[1]}
                thirdImage={item.imageUrls[2]}
                fourthImage={item.imageUrls[3]}
                fifthImage={item.imageUrls[4]}
                timeStamp={new Date(item.date).toLocaleString()}
              />
            ))}
          </ScrollView>
        </View>
          )
        }}
      </AppProviderConsumer>
    );
  }
}

export default Feed;
