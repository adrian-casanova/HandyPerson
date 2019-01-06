import React, { Component } from 'react';
import { View, TextInput, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';

const styles = {
  container: {
    width: '70%',
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingLeft: 5,
    paddingRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    color: 'white',
    width: '80%',
    height: 50
  }
}
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { handleSearch } = this.props;
    return (
      <View style={styles.container}>
        <IconButton icon="search" color="white"/>
        <TextInput
          style={styles.inputStyle}
          onChange={handleSearch}
          placeholder="Search"
        />
      </View>
    );
  }
}

export default SearchBar;
