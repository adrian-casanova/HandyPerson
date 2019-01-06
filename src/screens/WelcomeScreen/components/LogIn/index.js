import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import { primaryRed, deviceHeight } from '../../../../styles';
import RoundTextInput from '../RoundTextInput';

const styles = {
  container: {
    marginTop: deviceHeight / 2.5,
  },
  loginButton: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: primaryRed
  }
}
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      handleUsernameLogin,
      handlePasswordLogin,
      usernameLogin,
      passwordLogin,
      handleLogin
    }
    = this.props;
    return (
      <Animatable.View style={styles.container} animation="fadeIn">
        <KeyboardAvoidingView behavior="position">
        <RoundTextInput 
          onChange={handleUsernameLogin}
          value={usernameLogin}
          placeholderText="Email"
        />
        <RoundTextInput 
          onChange={handlePasswordLogin}
          value={passwordLogin}
          placeholderText="Password"
          secure
        />
        </KeyboardAvoidingView>
        <Button onPress={handleLogin} style={styles.loginButton} mode="contained">
          <Text style={styles.loginText}>
            LOGIN
          </Text>
        </Button>
      </Animatable.View>
    );
  }
}

export default LogIn;
