import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { deviceHeight, primaryRed } from '../../../../styles';

const styles = {
  container: {
    height: deviceHeight / 6,
    width: '60%',
    backgroundColor: 'white',
    // marginTop: deviceHeight / 6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  postingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  spinner: {
    marginTop: 20
  }
}
class PostingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { spinnerText } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.postingText}>{spinnerText}</Text>
        <ActivityIndicator size="large" color={primaryRed} style={styles.spinner}/>
      </View>
    );
  }
}

export default PostingSpinner;
