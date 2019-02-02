import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { youtubeLibraryLoaded } from './store/actions/api';
import AppLayout from './components/AppLayout';
import Home from './containers/Home';
import Trending from './containers/Trending';
import Search from './containers/Search';
import Watch from './containers/Watch';

const API_KEY = 'AIzaSyCdJmlJ4s_WCA5RNOCFLVI6n2cM_7oD_MQ';

class App extends Component {

  componentWillMount () {
    this.loadYoutubeApi();
  }

  loadYoutubeApi () {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', () => {
          this.props.youtubeLibraryLoaded();
        });
      });
    };

    document.body.appendChild(script);
  }

  render() {
    const { key } = this.props.location;

    return (
      <AppLayout>
        <Switch>
          <Route path="/feed/trending" component={Trending} />
          <Route path="/results" render={() => <Search key={key} />} />
          <Route path="/watch" render={() => <Watch key={key} />} />
          <Route path="/" component={Home} />
        </Switch>
      </AppLayout>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    youtubeLibraryLoaded
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(App));
