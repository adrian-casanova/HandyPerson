import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { deviceHeight, deviceWidth, primaryRed } from '../../../../styles';

const styles = {
  container: {
    height: deviceHeight,
    width: deviceWidth,
  },
  header: {
    backgroundColor: primaryRed
  }
}
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
         <Appbar.Header style={styles.header}>
             <Appbar.Action
                icon="back"
             />
             <Appbar.Content
               title="Edit Profile"
             />
         </Appbar.Header>
      </View>
    );
  }
}

export default EditProfile;
