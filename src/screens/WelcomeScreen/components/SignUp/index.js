import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RoundedTextInput from '../RoundTextInput';
import { Button } from 'react-native-paper';
import { deviceHeight, primaryRed } from '../../../../styles';

const styles = {
  container: {
    marginTop: deviceHeight / 3,
  },
  signUpButton: {
    width: '50%',
    alignSelf: 'center',
    // borderColor: 'white',
    // borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: primaryRed
  }
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      handleUserNameSignUp,
      signUpUserName,
      handleEmailSignUp,
      emailSignUp,
      handlePasswordSignUp,
      passwordSignUp,
      handleConfirmPasswordSignUp,
      confirmPasswordSignUp,
      handleSignUp
    } = this.props;
    return (
      <Animatable.View animation="fadeIn" style={styles.container}>
        <View>
          <RoundedTextInput
            onChange={handleUserNameSignUp}
            value={signUpUserName}
            placeholderText="Name"
          />
          <RoundedTextInput
            onChange={handleEmailSignUp}
            value={emailSignUp}
            placeholderText="Email"
          />
          <RoundedTextInput
            onChange={handlePasswordSignUp}
            value={passwordSignUp}
            placeholderText="Password"
            secure
          />
          <RoundedTextInput
            onChange={handleConfirmPasswordSignUp}
            value={confirmPasswordSignUp}
            placeholderText="Confirm password"
            secure
          />
        </View>
        <Button
          style={styles.signUpButton}
          mode="contained"
          onPress={handleSignUp}
        >
          <Text style={styles.signUpText}>
            SIGN UP
          </Text>
        </Button>
      </Animatable.View>
    );
  }
}

export default SignUp;
