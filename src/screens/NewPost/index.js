import React, { Component } from 'react';
import { AppProviderConsumer } from '../../../App';
import NewPostContainer from './components/NewPostContainer';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleGoToFeed = () => {
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <AppProviderConsumer>
        {({ userEmail, userName, userId }) => (
          <NewPostContainer
            userEmail={userEmail}
            userName={userName}
            userId={userId}
            handleGoToFeed={this.handleGoToFeed}
          />
        )}
      </AppProviderConsumer>
    );
  }
}

export default NewPost;
