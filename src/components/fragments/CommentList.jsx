import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentShape } from './CommentItem';

export default function CommentList({
  comments,
  authUser,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
}) {
  if (comments.length === 0) {
    return (
      <p className="text-slate-400 text-center mt-5">Belum ada komentar</p>
    );
  }
  return (
    <>
      {comments.map((comment) => (
        <div className="border-b-[1px] border-slate-200 p-3" key={comment.id}>
          <CommentItem
            {...comment}
            authUser={authUser}
            upVote={upVoteComment}
            downVote={downVoteComment}
            neutralizeVote={neutralizeVoteComment}
          />
        </div>
      ))}
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neutralizeVoteComment: PropTypes.func.isRequired,
};
