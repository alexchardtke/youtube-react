import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getChannelId } from '../../store/reducers/videos';
import { getCommentNextPageToken } from '../../store/reducers/comments';
import * as watchActions from '../../store/actions/watch';
import * as commentActions from '../../store/actions/comment';
import { getSearchParam } from '../../services/url';
import WatchContent from './WatchContent';

export class Watch extends Component {

  componentDidMount () {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }

  getVideoId () {
    return getSearchParam(this.props.location, 'v');
  }

  fetchWatchContent () {
    const videoId = this.getVideoId();
    if (!videoId) {
      this.props.history.push('/');
    }

    this.props.fetchWatchDetails(videoId, this.props.channelId);
  }

  fetchMoreComments = () => {
    if (this.props.nextPageToken) {
      this.props.fetchCommentThread(this.getVideoId(), this.props.nextPageToken);
    }
  }

  render () {
    const videoId = this.getVideoId();
    const { channelId, nextPageToken } = this.props;

    return (
      <WatchContent
        videoId={videoId}
        channelId={channelId}
        bottomReachedCallback={this.fetchMoreComments}
        nextPageToken={nextPageToken}
      />
    );
  }
}

function mapStateToProps (state, props) {
  const { location } = props;

  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, location, 'v'),
    nextPageToken: getCommentNextPageToken(state, location)
  }
}

function mapDispatchToProps (dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  const fetchCommentThread = commentActions.thread.request;
  return bindActionCreators({
    fetchWatchDetails,
    fetchCommentThread
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
