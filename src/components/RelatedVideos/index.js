import React from 'react';
import './RelatedVideos.scss';
import VideoPreview from '../VideoPreview';
import NextUpVideo from './NextUpVideo';

export default function RelatedVideos (props) {
  if (!props.videos || !props.videos.length) {
    return <div className="related-videos" />;
  }

  const nextUpVideo = props.videos[0];
  const remainingVideos = props.videos.slice(1);

  const relatedVideosPreviews = remainingVideos.map(relatedVideo => (
    <VideoPreview
      video={relatedVideo}
      key={relatedVideo.id}
      pathname="/watch"
      search={`?v=${relatedVideo.id}`}
      horizontal={true}
    />
  ));

  return (
    <div className="related-videos">
      <NextUpVideo video={nextUpVideo} />
      {relatedVideosPreviews}
    </div>
  );
}
