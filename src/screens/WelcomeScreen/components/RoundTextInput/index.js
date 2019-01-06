import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { deviceHeight, deviceWidth, lightPrimaryRed } from '../../../../styles';


const styles = {
  container: {
    width: deviceWidth - 100,
    height: 40, 
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    color: lightPrimaryRed
  }
}
class RoundedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { placeholderText, onChange, value, secure } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholderText}
          onChangeText={(text) => onChange(text)}
          value={value}
          style={styles.textInput}
          secureTextEntry={secure}
          // placeholderTextColor={lightPrimaryRed}
        />
      </View>
    );
  }
}

export default RoundedTextInput;
