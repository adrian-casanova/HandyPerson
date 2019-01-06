import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageStore
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Modal from "react-native-modal";
import { Appbar, Card, Button, RadioButton } from "react-native-paper";
import {
  deviceHeight,
  deviceWidth,
  primaryRed,
  primaryGreen
} from "../../../../styles";
import { createPost } from "../../../../services/PostingService";
import Preview from "../Preview";
import PostingSpinner from "../PostingSpinner";
import { uploadImage } from "../../../../services/StorageService";
import UUIDGenerator from "react-native-uuid-generator";

const styles = {
  header: {
    backgroundColor: primaryRed
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },
  titleTextInput: {
    width: "90%",
    alignSelf: "center",
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "lightgray"
  },
  textInputText: {
    fontSize: 14
  },
  textInputTextDescription: {
    fontSize: 14
  },
  cardContainer: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  descriptionContainer: {
    width: "90%",
    height: deviceHeight / 6,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 20
  },
  costsContainer: {
    width: "40%",
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10
  },
  hourlyRateText: {
    color: primaryRed,
    fontSize: 18
  },
  dollarSign: {
    color: primaryGreen,
    fontSize: 18
  },
  hourlyRateInput: {
    color: primaryGreen,
    fontSize: 18,
    width: 40,
    borderBottomWidth: 1,
    borderColor: primaryGreen
  },
  photosText: {
    color: "gray",
    fontSize: 18,
    marginTop: 10
  },
  photosContainer: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row"
  },
  photo: {
    height: 50,
    width: 50,
    backgroundColor: "lightgray",
    borderRadius: 5
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 5
  },
  nextButton: {
    backgroundColor: primaryRed,
    width: "50%",
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center"
  },
  nextButtonDisabled: {
    backgroundColor: "lightgray",
    width: "50%",
    borderRadius: 10,
    position: "absolute",
    top: deviceHeight / 1.45,
    alignSelf: "center"
  }
};

const options = {
  title: "Select Image",
  quality: 0.1,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class NewPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      hourlyRate: "",
      flatRate: "",
      showPreview: false,
      hourlyRateChecked: true,
      flatRateChecked: false,
      showPostingSpinner: false,
      firstImage: "",
      secondImage: "",
      thirdImage: "",
      fourthImage: "",
      fifthImage: "",
      spinnerText: ""
    };
  }
  handleOpenImagePicker = item => {
    ImagePicker.showImagePicker(options, response => {
      this.setState({
        showPostingSpinner: true,
        spinnerText: "Loading..."
      });
      console.log("Response = ", response);
      if (response.didCancel) {
        this.setState({
          showPostingSpinner: false
        });
      } else if (response.error) {
        this.setState({
          showPostingSpinner: false
        });
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (item === "1") {
          this.setState({
            firstImage: source,
            showPostingSpinner: false
          });
        } else if (item === "2") {
          this.setState({
            secondImage: source,
            showPostingSpinner: false
          });
        } else if (item === "3") {
          this.setState({
            thirdImage: source,
            showPostingSpinner: false
          });
        } else if (item === "4") {
          this.setState({
            fourthImage: source,
            showPostingSpinner: false
          });
        } else if (item === "5") {
          this.setState({
            fifthImage: source,
            showPostingSpinner: false
          });
        }
      }
    });
  };
  uploadImages = postId =>
    new Promise((resolve, reject) => {
      const {
        firstImage,
        secondImage,
        thirdImage,
        fourthImage,
        fifthImage
      } = this.state;
      const { userEmail } = this.props;
      Promise.all([
        uploadImage({
          email: userEmail,
          fileName: `file_1`,
          file: firstImage.data,
          postId
        }),
        secondImage
          ? uploadImage({
              email: userEmail,
              fileName: `file_2`,
              file: secondImage.data,
              postId
            })
          : null,
        thirdImage
          ? uploadImage({
              email: userEmail,
              fileName: `file_3`,
              file: thirdImage.data,
              postId
            })
          : null,
        fourthImage
          ? uploadImage({
              email: userEmail,
              fileName: `file_4`,
              file: fourthImage.data,
              postId
            })
          : null,
        fifthImage
          ? uploadImage({
              email: userEmail,
              fileName: `file_5`,
              file: fifthImage.data,
              postId
            })
          : null
      ])
        .then(resp => {
          const imageUrls = [resp[0], resp[1], resp[2], resp[3], resp[4]];
          resolve(imageUrls);
        })
        .catch(e => reject(e));
    });
  handleCreatePost = () => {
    const { userEmail, userName, userId } = this.props;
    this.setState({
      showPostingSpinner: true,
      spinnerText: "Posting"
    });
    UUIDGenerator.getRandomUUID()
      .then(async uuid => {
        const postId = uuid;
        console.log("postId: ", postId);
        const {
          title,
          description,
          hourlyRate,
          flatRate,
          hourlyRateChecked
        } = this.state;
        this.uploadImages(postId).then(response => {
          console.log("response: ", response);
          const date = new Date().getTime();
          createPost({
            title,
            description,
            cost: hourlyRate ? hourlyRate : flatRate,
            userEmail,
            userId,
            date,
            postedBy: userName,
            isHourly: hourlyRateChecked,
            imageUrls: response,
            postId
          }).then(() => {
            this.setState({
              showPostingSpinner: false,
              title: "",
              description: "",
              cost: "",
              showPreview: false,
              hourlyRate: "",
              flatRate: "",
              firstImage: "",
              secondImage: "",
              thirdImage: "",
              fourthImage: "",
              fifthImage: ""
            });
            this.props.handleGoToFeed();
          });
        });
      })
      .catch(e => {
        this.setState({
          showPostingSpinner: false
        });
        console.log("e: ", e);
        alert(e);
      });
  };

  handleTitleChange = value => {
    this.setState({
      title: value
    });
  };
  handleDescriptionChange = value => {
    this.setState({
      description: value
    });
  };

  handleHourlyRateChange = value => {
    this.setState({
      hourlyRate: value
    });
  };
  handleFlatRateChange = value => {
    this.setState({
      flatRate: value
    });
  };

  handlePreviewPost = () => {
    this.setState({
      showPreview: true
    });
  };

  handleGoBack = () => {
    this.setState({
      showPreview: false
    });
  };

  handleHourlyCheckboxChange = () => {
    this.setState({
      hourlyRateChecked: true,
      flatRateChecked: false,
      flatRate: ""
    });
  };
  handleFlatRateCheckboxChange = () => {
    this.setState({
      hourlyRateChecked: false,
      flatRateChecked: true,
      hourlyRate: ""
    });
  };

  render() {
    const {
      title,
      description,
      hourlyRate,
      flatRate,
      showPreview,
      hourlyRateChecked,
      flatRateChecked,
      showPostingSpinner,
      firstImage,
      secondImage,
      thirdImage,
      fourthImage,
      fifthImage,
      spinnerText
    } = this.state;
    const { userName } = this.props;
    return (
      <View>
        <Modal
          isVisible={showPostingSpinner}
          onRequestClose={() => this.setState({ showPostingSpinner: false })}
        >
          <PostingSpinner spinnerText={spinnerText} />
        </Modal>
        {showPreview ? (
          <Preview
            title={title}
            description={description}
            hourlyRate={hourlyRate}
            flatRate={flatRate}
            handleGoBack={this.handleGoBack}
            userName={userName}
            firstImage={firstImage.data}
            secondImage={secondImage.data}
            thirdImage={thirdImage.data}
            fourthImage={fourthImage.data}
            fifthImage={fifthImage.data}
            handleSubmit={this.handleCreatePost}
            hourlyRateChecked={hourlyRateChecked}
          />
        ) : (
          <React.Fragment>
            <Appbar.Header style={styles.header}>
              <Appbar.Content titleStyle={{ alignSelf: 'center' }} title="New Post" />
            </Appbar.Header>
            <View style={styles.container}>
              <Card style={styles.cardContainer}>
                <TextInput
                  placeholder="Job Title(required)"
                  value={title}
                  placeholderTextColor="darkgray"
                  style={styles.titleTextInput}
                  onChangeText={text => this.handleTitleChange(text)}
                />
                <View style={styles.descriptionContainer}>
                  <TextInput
                    placeholder="Description(required)"
                    value={description}
                    multiline
                    placeholderTextColor="darkgray"
                    numberOfLines={10}
                    onChangeText={text => this.handleDescriptionChange(text)}
                  />
                </View>
                <View style={styles.costsContainer}>
                  <RadioButton.Android
                    value="second"
                    color={primaryRed}
                    onPress={this.handleHourlyCheckboxChange}
                    uncheckedColor="lightgray"
                    status={hourlyRateChecked ? "checked" : "unchecked"}
                  />
                  <Text
                    style={{
                      color: hourlyRateChecked ? primaryRed : "lightgray",
                      fontSize: 18
                    }}
                  >
                    Hourly Rate:{" "}
                    <Text
                      style={{
                        color: hourlyRateChecked ? primaryGreen : "lightgray",
                        fontSize: 18
                      }}
                    >
                      $
                    </Text>
                  </Text>
                  <TextInput
                    style={{
                      color: hourlyRateChecked ? primaryGreen : "lightgray",
                      fontSize: 18,
                      width: 40,
                      borderBottomWidth: 1,
                      borderColor: hourlyRateChecked
                        ? primaryGreen
                        : "lightgray"
                    }}
                    value={hourlyRate}
                    editable={hourlyRateChecked}
                    onChangeText={text => this.handleHourlyRateChange(text)}
                  />
                </View>
                <View style={styles.costsContainer}>
                  <RadioButton.Android
                    value="first"
                    color={primaryRed}
                    onPress={this.handleFlatRateCheckboxChange}
                    uncheckedColor="lightgray"
                    status={flatRateChecked ? "checked" : "unchecked"}
                  />
                  <Text
                    style={{
                      color: flatRateChecked ? primaryRed : "lightgray",
                      fontSize: 18
                    }}
                  >
                    Flat Rate:{" "}
                    <Text
                      style={{
                        color: flatRateChecked ? primaryGreen : "lightgray",
                        fontSize: 18
                      }}
                    >
                      $
                    </Text>
                  </Text>
                  <TextInput
                    style={{
                      color: flatRateChecked ? primaryGreen : "lightgray",
                      fontSize: 18,
                      width: 40,
                      borderBottomWidth: 1,
                      borderColor: flatRateChecked ? primaryGreen : "lightgray"
                    }}
                    value={flatRate}
                    editable={flatRateChecked}
                    onChangeText={text => this.handleFlatRateChange(text)}
                  />
                </View>
              </Card>
              <Text style={styles.photosText}>Photos:</Text>
              <View style={styles.photosContainer}>
                <TouchableOpacity
                  onPress={() => this.handleOpenImagePicker("1")}
                  style={styles.photo}
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${firstImage.data}` }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleOpenImagePicker("2")}
                  style={styles.photo}
                >
                  <Image
                    source={{
                      uri: `data:image/png;base64,${secondImage.data}`
                    }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleOpenImagePicker("3")}
                  style={styles.photo}
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${thirdImage.data}` }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleOpenImagePicker("4")}
                  style={styles.photo}
                >
                  <Image
                    source={{
                      uri: `data:image/png;base64,${fourthImage.data}`
                    }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleOpenImagePicker("5")}
                  style={styles.photo}
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${fifthImage.data}` }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
              <Button
                style={
                  !title || !description || (!hourlyRate && !flatRate)
                    ? styles.nextButtonDisabled
                    : styles.nextButton
                }
                onPress={this.handlePreviewPost}
                disabled={!title || !description || (!hourlyRate && !flatRate)}
              >
                Preview Post
              </Button>
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}

export default NewPostContainer;
