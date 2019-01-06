import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { deviceWidth, deviceHeight } from '../../../../styles';
import { IconButton } from 'react-native-paper';

const styles = {
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 40,
    top: 100
  },
  imageBackground: {
    height: deviceHeight / 2,
    width: deviceWidth,
    backgroundColor: 'black',
    alignSelf: 'center'
  }
}
class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { imagePreviewOpen, imageSource, handleClosePreview } = this.props;
    return (
      <Modal
        isVisible={imagePreviewOpen}
        onBackdropPress={handleClosePreview}
        onBackButtonPress={handleClosePreview}
      > 
        <View>
          <View style={styles.imageBackground}>
            <Image
              source={{ uri: imageSource }}
              style={styles.image}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ImagePreview;
