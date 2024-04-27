import React, { useState } from 'react';
import parser from 'html-react-parser/lib/index';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import postedAt from '../../utils';
import Card from '../elements/card/Card';

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  user,
  authUser,
}) {
  const [isReadMore, setIsReadMore] = useState(true);
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  function downVoteClick() {
    downVote(id);
  }
  function upVoteClick() {
    upVote(id);
  }
  function neutralizeVoteClick() {
    neutralizeVote(id);
  }

  function toggleReadMore() {
    setIsReadMore(!isReadMore);
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="border border-slate-400 text-slate-400 p-1 max-w-fit rounded-lg ">
            <p>#{category}</p>
          </div>
          <p className="text-slate-400 text-sm">{postedAt(createdAt)}</p>
        </div>

        <div>
          <p className="text-sm text-slate-400">{user.name}</p>
        </div>
      </div>

      <div>
        <div className="mb-3">
          <h1 className="text-lg font-bold text-primary mb-3">{title}</h1>
          <div className="text-base text-slate-500 break-words text-ellipsis">
            {parser(isReadMore ? body.slice(0, 200) : body)}
            {body.length > 200 && (
              <button
                type="button"
                aria-label="read-more"
                onClick={toggleReadMore}
                className="text-primary hover:text-[#3825B5] duration-200 "
              >
                {isReadMore ? '...Lihat semua' : 'Lebih sedikit'}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {isUpVoted ? (
              <button
                onClick={neutralizeVoteClick}
                type="button"
                aria-label="thumb-up"
              >
                <FaThumbsUp className="text-primary text-sm" />
              </button>
            ) : (
              <button onClick={upVoteClick} type="button" aria-label="thumb-up">
                <FaRegThumbsUp className="text-slate-400 text-sm" />
              </button>
            )}
            <p>{upVotesBy.length}</p>
          </div>

          <div className="flex items-center gap-1">
            {isDownVoted ? (
              <button
                onClick={neutralizeVoteClick}
                type="button"
                aria-label="thumb-down"
              >
                <FaThumbsDown className="text-primary text-sm" />
              </button>
            ) : (
              <button
                onClick={downVoteClick}
                aria-label="thumb-down"
                type="button"
              >
                <FaRegThumbsDown className="text-slate-400 text-sm" />
              </button>
            )}
            <p>{downVotesBy.length}</p>
          </div>

          <div className="flex items-center gap-1">
            <AiOutlineComment className="text-slate-400" />
            <p>{totalComments}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { threadItemShape, userShape };
