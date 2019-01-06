import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import firebase from 'firebase';
import { Appbar, Card, IconButton } from 'react-native-paper';
import { primaryRed } from '../../styles';
import { getAllUsers } from '../../services/UserService';
import { AppProviderConsumer } from '../../../App';
import ProfileComponent from './components/ProfileComponent';

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
  }
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numReviews: 0,
      numPosts: 0,
      numFollowers: 0
    };
  }

  componentDidMount() {
    console.log("this.props: ", this.props.navigation);
  }

  handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          firebase.auth().signOut();
          this.props.navigation.navigate('Auth');
        }},
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <AppProviderConsumer>
        {({ userEmail, userName, userId }) => (
          <ProfileComponent
            userEmail={userEmail}
            userName={userName}
            userId={userId}
            handleLogout={this.handleLogout}
            path={this.props.navigation.state.key}
          />
        )}
      </AppProviderConsumer>
    );
  }
}

export default Profile;
