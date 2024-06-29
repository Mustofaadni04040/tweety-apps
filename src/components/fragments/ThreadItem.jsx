import React, { useState } from 'react';
import parser from 'html-react-parser/lib/index';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import Card from '@mui/material/Card';
import { Avatar, CardActions, CardContent } from '@mui/material';
import postedAt from '../../utils';
import VoteButton from './VoteButton';

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
  const navigate = useNavigate();

  function toggleReadMore() {
    setIsReadMore(!isReadMore);
  }

  function onThreadClick() {
    navigate(`/threads/${id}`);
    window.scrollTo(0, 0);
  }

  function onThreadPress(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate(`/threads/${id}`);
      window.scrollTo(0, 0);
    }
  }

  return (
    <Card sx={{ p: 1, borderRadius: '12px' }}>
      <CardContent sx={{ pb: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="border border-slate-400 text-slate-400 p-1 max-w-fit rounded-lg ">
              <p>#{category}</p>
            </div>
            <p className="text-slate-400 text-sm">{postedAt(createdAt)}</p>
          </div>

          <div className="flex items-center gap-3 ">
            <p className="text-sm text-slate-400">{user.name}</p>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 30, height: 30 }}
            />
          </div>
        </div>

        <div>
          <div className="mb-3">
            <div
              tabIndex={0}
              role="button"
              onClick={onThreadClick}
              onKeyDown={onThreadPress}
              className="group"
            >
              <h1 className="text-lg font-bold text-primary mb-3 break-words group-hover:text-[#3825B5] duration-200">
                {title}
              </h1>
            </div>
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
        </div>
      </CardContent>

      <CardActions
        sx={{ ml: 1, display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
        <div className="flex items-center gap-1">
          <AiOutlineComment className="text-slate-400" />
          <p>{totalComments}</p>
        </div>
      </CardActions>
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
