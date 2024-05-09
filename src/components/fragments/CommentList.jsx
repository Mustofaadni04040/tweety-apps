import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
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
      <div className="mt-5 flex flex-col items-center">
        <AiOutlineComment className="text-slate-400 text-9xl" />
        <p className="text-slate-400 text-lg">Belum ada komentar</p>
        <p className="text-slate-400 text-sm">
          Jadilah pertama yang berkomentar
        </p>
      </div>
    );
  }
  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upVote={upVoteComment}
          downVote={downVoteComment}
          neutralizeVote={neutralizeVoteComment}
        />
      ))}
    </section>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neutralizeVoteComment: PropTypes.func.isRequired,
};
