import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { primaryRed, deviceHeight } from '../../../../styles';
import Post from '../../../Feed/components/Post';

const styles = {
  header: {
    backgroundColor: primaryRed
  },
  submitButton: {
    backgroundColor: primaryRed,
    width: '45%',
    borderRadius: 10,
    alignSelf: 'center',
    top: deviceHeight / 4
  }
}
class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      handleGoBack,
      title,
      description,
      hourlyRate,
      flatRate,
      userName,
      hourlyRateChecked,
      handleSubmit,
      firstImage,
      secondImage,
      thirdImage,
      fourthImage,
      fifthImage,
    } = this.props;
    return (
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="arrow-back" onPress={handleGoBack}/>
          <Appbar.Content
            title="Preview"
          />
        </Appbar.Header>
        <Post
          postTitle={title}
          postedBy={userName}
          firstImage={firstImage}
          secondImage={secondImage}
          thirdImage={thirdImage}
          fourthImage={fourthImage}
          fifthImage={fifthImage}
          postDescription={description}
          timeStamp={new Date().toLocaleString()}
          cost={hourlyRate ? hourlyRate : flatRate}
          hourlyRateChecked={hourlyRateChecked}

        />
        <Button onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </Button>
      </View>
    );
  }
}

export default Preview;
