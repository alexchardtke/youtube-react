import React, { Component } from 'react';
import './WatchContent.scss';
import { connect } from 'react-redux';
import { getAmountComments, getRelatedVideos, getVideoById } from '../../../store/reducers/videos';
import { getChannel } from '../../../store/reducers/channels';
import { getCommentsForVideo } from '../../../store/reducers/comments';
import InfiniteScroll from '../../../components/InfiniteScroll';
import RelatedVideos from '../../../components/RelatedVideos';
import Video from '../../../components/Video';
import VideoInfoBox from '../../../components/VideoInfoBox';
import VideoMetadata from '../../../components/VideoMetadata';
import Comments from '../../Comments';

class WatchContent extends Component {

  shouldShowLoader () {
    return !!this.props.nextPageToken;
  }

  render () {
    if (!this.props.videoId) return <div />;

    const { bottomReachedCallback, video, videoId, relatedVideos, comments, channel, amountComments } = this.props;
    return (
      <InfiniteScroll bottomReachedCallback={bottomReachedCallback} showLoader={this.shouldShowLoader()}>
        <div className="watch-grid">
          <Video className="video" id={videoId} />
          <VideoMetadata className="metadata" video={video} />
          <VideoInfoBox className="video-info-box" video={video} channel={channel} />
          <RelatedVideos className="related-videos" videos={relatedVideos} />
          <Comments className="comments" comments={comments} amountComments={amountComments} />
        </div>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps (state, props) {
  const { videoId, channelId } = props;

  return {
    relatedVideos: getRelatedVideos(state, videoId),
    video: getVideoById(state, videoId),
    channel: getChannel(state, channelId),
    comments: getCommentsForVideo(state, videoId),
    amountComments: getAmountComments(state, videoId)
  };
}

export default connect(mapStateToProps, null)(WatchContent);
