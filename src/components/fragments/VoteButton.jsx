import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa';

export default function VoteButton({
  id,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
  upVotesBy,
  downVotesBy,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  function onDownVoteClick() {
    downVote(id);
  }
  function onUpVoteClick() {
    upVote(id);
  }
  function onNeutralizeVoteClick() {
    neutralizeVote(id);
  }
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {isUpVoted ? (
          <button
            onClick={onNeutralizeVoteClick}
            type="button"
            aria-label="thumb-up"
          >
            <FaThumbsUp className="text-primary text-sm" />
          </button>
        ) : (
          <button onClick={onUpVoteClick} type="button" aria-label="thumb-up">
            <FaRegThumbsUp className="text-slate-400 text-sm" />
          </button>
        )}
        <p>{upVotesBy.length}</p>
      </div>

      <div className="flex items-center gap-1">
        {isDownVoted ? (
          <button
            onClick={onNeutralizeVoteClick}
            type="button"
            aria-label="thumb-down"
          >
            <FaThumbsDown className="text-primary text-sm" />
          </button>
        ) : (
          <button
            onClick={onDownVoteClick}
            aria-label="thumb-down"
            type="button"
          >
            <FaRegThumbsDown className="text-slate-400 text-sm" />
          </button>
        )}
        <p>{downVotesBy.length}</p>
      </div>
    </div>
  );
}
VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};
