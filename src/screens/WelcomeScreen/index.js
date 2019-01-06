import React, { Component } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
import { primaryRed, deviceHeight, deviceWidth} from '../../styles';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
require('firebase/firestore');


const styles = {
  Container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'rgba(223,67,67, 0.8)',
  },
  loginView: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    height: 190,
    justifyContent: 'space-between'
  },
  loginButton: {
    width: '60%',
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    width: '60%',
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  loginText: {
    color: primaryRed,
    fontSize: 18,
  },
  signUpText: {
    fontSize: 18
  },
  forgotPasswordText: {
    fontSize: 10,
    color: 'white'
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  loginIconView: {
    width: '70%',
    marginTop: deviceHeight / 1.75,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    fontSize: 35,
    color: primaryRed,
    fontWeight: 'bold',
  },
  backIcon: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
  imageBackground: {
    height: deviceHeight,
    width: deviceWidth,
    opacity: 1
  },
  spinner: {
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const HomeScreenImage = require('../../assets/homeScreen.jpg');
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signUpOpen: false,
      signUpUsername: '',
      dateOfBirthSignUp: '',
      emailSignUp: '',
      passwordSignUp: '',
      confirmPasswordSignUp: '',
      usernameLogin: '',
      passwordLogin: '',
      showSpinner: true
    };
  }

  handleGoToLogin = () => {
    this.welcomeRef.fadeOut(800);
    this.setState({
      loginOpen: true
    })
  }

  componentDidMount() {
    this.checkAuthState();
  }

  checkAuthState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('App');
        this.saveUserToStorage(user.email, user.uid);
      } else {
        this.setState({
          showSpinner: false
        });
      }
    })
  }

  saveUserToStorage = async (email, userId) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userId', userId);
    }
    catch (e) {
      console.log(e);
    }
  }
  handleGoToSignUp = () => {
    this.welcomeRef.fadeOut(800);
    this.setState({
      signUpOpen: true
    });
  }

  handleGoToForgotPassword = () => {
    alert('forgotPassword');
  }
  
  handleUserNameSignUp = (value) => {
    this.setState({
      signUpUsername: value
    });
  }
  handleUsernameLogin = (value) => {
    this.setState({
      usernameLogin: value
    });
  }
  handleEmailSignUp = (value) => {
    this.setState({
      emailSignUp: value
    });
  }
  handlePasswordSignUp = (value) => {
    this.setState({
      passwordSignUp: value
    });
  }
  handlePasswordLogin = (value) => {
    this.setState({
      passwordLogin: value
    });
  }
  handleConfirmPasswordSignUp = (value) => {
    this.setState({
      confirmPasswordSignUp: value
    });
  }
  handleDateOfBirthSignUp = (value) => {
    this.setState({
      dateOfBirthSignUp: value
    });
  }

  handleSignUp = () => {
    const {
      emailSignUp,
      passwordSignUp,
      confirmPasswordSignUp,
      signUpUsername
    } = this.state;
    if (!emailSignUp.length || !passwordSignUp.length ||
      !confirmPasswordSignUp.length || !signUpUsername.length) {
        alert('Fill in missing information!');
        return;
    } else if (
      passwordSignUp !== confirmPasswordSignUp
    ) {
      alert('Passwords do not match!');
      return;
    }
    this.setState({
      showSpinner: true
    })
    firebase.auth()
      .createUserWithEmailAndPassword(emailSignUp, passwordSignUp)
        .then(() => {
          // this.props.navigation.navigate('Feed');
          firebase.auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            firebase.auth().signInWithEmailAndPassword(emailSignUp, passwordSignUp)
            .then(() => {
               this.handleCreateUser();
            })
            .catch(e => {
              alert(e);
              this.setState({
                showSpinner: false
              });
            })
          })
        })
      .catch((e) => {
        alert(e)
        this.setState({
          showSpinner: false
        });
      });
  }

  handleCreateUser = () => {
    const { signUpUsername, emailSignUp } = this.state;
    const database = firebase.firestore();
    database.settings({
      timestampsInSnapshots: true
    });
    database.collection("users")
      .add({
        name: signUpUsername,
        email: emailSignUp,
      })
      .then((docRef) => {
        console.log('document writtent with Id: ', docRef.id);
        this.props.navigation.navigate('Feed');
        this.setState({
          loginOpen: false
        });
    })
      .catch((e) => alert(e));
  }
  

  handleLogin = () => {
    const {
      usernameLogin,
      passwordLogin
    } = this.state;
    if (!usernameLogin || !passwordLogin) {
      alert('Fill out all the information!');
      return;
    }
    this.setState({
      showSpinner: true
    });
    firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(usernameLogin, passwordLogin)
        .then(() => {
          this.props.navigation.navigate('Feed');
          this.setState({
            loginOpen: false
          });
        })
        .catch(e => {
          alert(e);
          this.setState({
            showSpinner: false
          });
        })
      })
      
  }

  handleGoBack = () => {
    this.setState({
      signUpOpen: false,
      loginOpen: false
    })
  }

  render() {
    const {
      signUpOpen,
      loginOpen,
      signUpUsername,
      dateOfBirthSignUp,
      confirmPasswordSignUp,
      emailSignUp,
      passwordSignUp,
      usernameLogin,
      passwordLogin,
      showSpinner
    } = this.state;
    return (
      <ImageBackground style={styles.imageBackground} source={HomeScreenImage}>
        <View
          style={styles.Container}
        >
          {showSpinner &&
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color="white"/>
            </View>
          }
          {signUpOpen || loginOpen ? null : 
            <Animatable.View animation="fadeIn" ref={ref => this.welcomeRef = ref}>
            <View style={styles.loginIconView}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>f</Text>
              </View>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>G</Text>
              </View>
            </View>
            <View style={styles.loginView}>
              <View style={styles.divider}/>
              <Button onPress={this.handleGoToLogin} style={styles.loginButton} mode="contained">
                <Text style={styles.loginText}>LOGIN</Text>
              </Button>
              <Button onPress={this.handleGoToSignUp} style={styles.signUpButton} mode="outlined">
                <Text style={styles.signUpText}>
                  SIGN UP
                </Text>
              </Button>
              <Button onPress={this.handleGoToForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </Button>
            </View>
            </Animatable.View>
          }
          {signUpOpen && 
            <React.Fragment>
              <KeyboardAvoidingView>
              <IconButton
                icon="keyboard-arrow-left"
                style={styles.backIcon}
                size={50}
                color="white"
                onPress={this.handleGoBack}
              />
              <SignUp
                handleUserNameSignUp={this.handleUserNameSignUp}
                signUpUsername={signUpUsername}
                handleEmailSignUp={this.handleEmailSignUp}
                emailSignUp={emailSignUp}
                handlePasswordSignUp={this.handlePasswordSignUp}
                passwordSignUp={passwordSignUp}
                handleConfirmPasswordSignUp={this.handleConfirmPasswordSignUp}
                confirmPasswordSignUp={confirmPasswordSignUp}
                handleDateOfBirthSignUp={this.handleDateOfBirthSignUp}
                dateOfBirthSignUp={dateOfBirthSignUp}
                handleSignUp={this.handleSignUp}
              />
              </KeyboardAvoidingView>
            </React.Fragment>
          }
          {loginOpen &&
            <React.Fragment>
              <IconButton
                icon="keyboard-arrow-left"
                style={styles.backIcon}
                size={50}
                color="white"
                onPress={this.handleGoBack}
              />
              <LogIn
                handleUsernameLogin={this.handleUsernameLogin}
                usernameLogin={usernameLogin}
                handlePasswordLogin={this.handlePasswordLogin}
                passwordLogin={passwordLogin}
                handleLogin={this.handleLogin}
              />
            </React.Fragment>
          }
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeScreen;
