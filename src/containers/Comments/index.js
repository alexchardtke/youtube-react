import React, { Component } from 'react';
import CommentsHeader from './CommentsHeader';
import Comment from './Comment';
import AddComment from './AddComment';

export default class Comments extends Component {
  render () {
    if (!this.props.comments) return <div />;

    const comments = this.props.comments.map((comment) => {
      return <Comment comment={comment} key={comment.id} />;
    });

    return (
      <div>
        <CommentsHeader amountComments={this.props.amountComments} />
        <AddComment key="add-comment" />
        {comments}
      </div>
    );
  }
}
