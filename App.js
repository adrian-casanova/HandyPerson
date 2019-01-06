import React, {Component} from 'react';
import { Text, View, Platform } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryRed } from './src/styles'
import WelcomeScreen from './src/screens/WelcomeScreen';
import Feed from './src/screens/Feed';
import firebase from 'firebase';
import Messaging from './src/screens/Messaging';
import NewPost from './src/screens/NewPost';
import Profile from './src/screens/Profile';
import { getUserName } from './src/services/UserService';

var config = {
  apiKey: "AIzaSyBkoc5sfdzy9XXUTx51kdh5ThxRHk82bJ0",
  authDomain: "handyman-7d079.firebaseapp.com",
  databaseURL: "https://handyman-7d079.firebaseio.com",
  projectId: "handyman-7d079",
  storageBucket: "handyman-7d079.appspot.com",
  messagingSenderId: "182104166342"
};
firebase.initializeApp(config);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white'
  }
};

const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userName: '' 
    } 
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      if (typeof Symbol === 'undefined') {
        if (Array.prototype['@@iterator'] === undefined) {
          Array.prototype['@@iterator'] = function() {
            let i = 0;
            return {
              next: () => ({
                done: i >= this.length,
                value: this[i++],
              }),
            };
          };
        }
      }
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserName(user.email)
          .then((snapshot) => {
              snapshot.forEach(doc => {
                this.setState({
                  userName: doc.data().name,
                  userEmail: user.email,
                  userId: user.uid
                })
              });
          })
      }
    })
  }
  render() {
     return <AppContext.Provider value={this.state}>
       {this.props.children}
     </AppContext.Provider>
   }
 }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppProvider>
          <AppContainer />
        </AppProvider>
      </PaperProvider>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  Feed,
  Chat: Messaging,
  Post: NewPost,
  Profile
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Feed') {
        iconName = `ios-list`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person`;
      } else if (routeName === 'Chat') {
        iconName = 'ios-chatboxes'
      } else if (routeName === 'Post') {
        iconName = 'ios-add-circle'
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} style={{ marginBottom: 5 }} size={horizontal ? 20 : 30} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: primaryRed,
    inactiveTintColor: 'gray',
    style: { height: 70 },
    showLabel: false,
    iconStyle: { height: 30, width: 30 },
    labelStyle: { paddingBottom: 30 },
    safeAreaInset: { bottom: 'never', top: 'never' }
  },
});

const AppNavigator = createSwitchNavigator({
  Auth: WelcomeScreen,
  App: TabNavigator
}, {
  initialRouteName: 'Auth'
});


const AppContainer = createAppContainer(AppNavigator);
export const AppProviderConsumer = AppContext.Consumer;
export default App;

