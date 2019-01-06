import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { primaryRed, primaryGreen } from '../../../../styles';

const styles = {
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  titleRow: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'gray'
  },
  placeholderImages: {
    height: 150,
    width: 200,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'lightgray'
  },
  scrollContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20
  },
  timeStampContainer: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
  },
  timeStampText: {
    fontSize: 10,
    color: 'gray'
  },
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'gray',
    marginTop: 5,
    marginBottom: 10,
  },
  actions: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  postedBy: {
    color: 'gray'
  },
  postedByContainer: {
    width: '95%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  costContainer: {
    height: 30,
    width: 80,
    borderRadius: 20,
    backgroundColor: primaryGreen,
    justifyContent: 'center',
    alignItems: 'center'
  },
  costText: {
    color: 'white',
    fontWeight: 'bold'
  },
  actionText: {
    fontSize: 14,
    color: 'gray',
    paddingBottom: 15,
    paddingTop: 5
  }
}
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const {
      postTitle,
      postedBy,
      postDescription,
      timeStamp,
      cost,
      hourlyRateChecked,
      firstImage,
      secondImage,
      thirdImage,
      fourthImage,
      fifthImage,
    } = this.props;
    return (
      <Card style={styles.container}>
        <View style={styles.titleRow}>
          <Title>
            {postTitle}
          </Title>
        </View>
        <Text
          style={styles.description}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {postDescription}
        </Text>
        <ScrollView horizontal style={styles.scrollContainer}>
          {firstImage ?
            <Image
              source={{uri: `data:image/png;base64,${firstImage}` }}
              style={styles.placeholderImages}
            /> : null
          }
          {secondImage ?
            <Image
              source={{uri: `data:image/png;base64,${secondImage}` }}
              style={styles.placeholderImages}
            /> : null
          }
          {thirdImage ?
            <Image
              source={{uri: `data:image/png;base64,${thirdImage}` }}
              style={styles.placeholderImages}
            /> : null
          }
          {fourthImage ?
            <Image
              source={{uri: `data:image/png;base64,${fourthImage}` }}
              style={styles.placeholderImages}
            /> : null
          }
          {fifthImage ?
            <Image
              source={{uri: `data:image/png;base64,${fifthImage}` }}
              style={styles.placeholderImages}
            /> : null
          }
        </ScrollView>
        <View style={styles.postedByContainer}>
          <Text style={styles.postedBy}>
              {postedBy}
          </Text>
        </View>
        <View style={styles.timeStampContainer}>
          <View style={styles.costContainer}>
            <Text style={styles.costText}>
              ${cost}{hourlyRateChecked ? '/hour' : null}
            </Text>
          </View>
          <Text style={styles.timeStampText}>
            {timeStamp}
          </Text>
        </View>
        <View style={styles.divider}/>
        <View style={styles.actions}>
          <Text style={styles.actionText}>View</Text>
          <Text style={styles.actionText}>Profile</Text>
          <Text style={styles.actionText}>Message</Text>
        </View>
      </Card>
    );
  }
}

export default Post;
