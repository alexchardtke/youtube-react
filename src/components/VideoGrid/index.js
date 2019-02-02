import React from 'react';
import './VideoGrid.scss';
import VideoGridHeader from './VideoGridHeader';
import { Divider } from 'semantic-ui-react';
import VideoPreview from '../VideoPreview';

export default function VideoGrid (props) {

  if (!props.videos || !props.videos.length) return <div />;

  const gridItems = props.videos.map(video => (
    <VideoPreview video={video} key={video.id} pathname="/watch" search={`?v=${video.id}`} />
  ));

  const divider = props.hideDivider ? null : <Divider />;

  return (
    <React.Fragment>
      <VideoGridHeader title={props.title} />
      <div className="video-grid">
        {gridItems}
      </div>
      {divider}
    </React.Fragment>
  );
}
