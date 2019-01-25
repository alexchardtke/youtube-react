import React, { Component } from 'react';
import { Subscription } from './Subscription';
import { Divider } from 'semantic-ui-react';
import { SideBarHeader } from '../SideBarHeader';

export class Subscriptions extends Component {
  render () {
    return (
      <React.Fragment>
        <SideBarHeader title="Subscriptions"/>
        <Subscription label="MusicChannel" broadcasting />
        <Subscription label="Coursea" amountNewVideos={10} />
        <Subscription label="Tedx Talks" amountNewVideos={23} />
        <Subscription label="Stanford iOS" amountNewVideos={4} />
        <Subscription label="Udacity" amountNewVideos={114} />
        <Divider />
      </React.Fragment>
    );
  }
}
