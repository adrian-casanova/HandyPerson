import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import firebase from 'firebase';
import { Appbar, Card, IconButton, Portal, FAB } from 'react-native-paper';
import { primaryRed, deviceHeight } from '../../../../styles';
import { getAllUsers } from '../../../../services/UserService';

const styles = {
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  header: {
    backgroundColor: primaryRed,
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20
  },
  stat: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  value: {
    color: 'gray',
    fontSize: 24
  },
  metric: {
    color: 'gray',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10
  },
  userName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    color: 'gray',
    alignSelf: 'center',
    marginTop: 5,
  },
  placeholderProfileImage: {
    fontSize: 100,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  ratingContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 70
  },
  fabGroup: {
    marginBottom: deviceHeight / 13,
  }
}
class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numReviews: 0,
      numPosts: 0,
      numFollowers: 0,
      fabOpen: false
    };
  }

  render() {
    const { userName, handleLogout } = this.props;
    const { fabOpen } = this.state;
    return (
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.Content 
            title="Profile"
            titleStyle={{ alignSelf: 'center' }}
          />
          <Appbar.Action 
            icon="close"
            onPress={handleLogout}
          />
        </Appbar.Header>
        <View style={styles.profileHeader}>
          <Card style={styles.profilePicture}>
            <Text style={styles.placeholderProfileImage}>
              A
            </Text>
          </Card>
        </View>
        <Text style={styles.userName}>
          {userName}
        </Text>
        <Text style={styles.title}>
          Developer
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.value}>
               0
            </Text>
            <Text style={styles.metric}>
              Reviews
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.value}>
               0
            </Text>
            <Text style={styles.metric}>
              Posts
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.value}>
               0
            </Text>
            <Text style={styles.metric}>
              Followers
            </Text>
          </View>
        </View>
        <View style={styles.divider}/>
        <View style={styles.ratingContainer}>
           <IconButton
              icon="star-border"
              color="gray"
              size={40}
           />
           <IconButton
              icon="star-border"
              color="gray"
              size={40}
           />
           <IconButton
              icon="star-border"
              color="gray"
              size={40}
           />
           <IconButton
              icon="star-border"
              color="gray"
              size={40}
           />
           <IconButton
              icon="star-border"
              color="gray"
              size={40}
           />
        </View>
          <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? 'close' : 'settings'}
            style={styles.fabGroup}
            theme={{ colors: { accent: primaryRed } }}
            actions={[
              { icon: 'build', label: 'Preferences', onPress: () => console.log('Pressed star')},
              { icon: 'notifications', label: 'Reminders', onPress: () => console.log('Pressed star')},
              { icon: 'share', label: 'Leave a review', onPress: () => console.log('Pressed email') },
              { icon: 'edit', label: 'Edit profile', onPress: () => console.log('Pressed notifications') },
            ]}
            onStateChange={({ open }) => this.setState({ fabOpen: open })}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
          </Portal>
      </View>
    );
  }
}

export default ProfileComponent;
