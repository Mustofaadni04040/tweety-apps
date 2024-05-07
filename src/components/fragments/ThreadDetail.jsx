import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser/lib/index';
import { Avatar } from '@mui/material';
import { userShape } from './ThreadItem';
import postedAt from '../../utils';
import VoteButton from './VoteButton';

export default function ThreadDetail({
  id,
  title,
  body,
  owner,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  upVoteThreadDetail,
  downVoteThreadDetail,
  neutralizeVoteThreadDetail,
  authUser,
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="border border-slate-400 text-slate-400 p-1 max-w-fit rounded-lg ">
            <p>#{category}</p>
          </div>
          <p className="text-slate-400 text-sm">{postedAt(createdAt)}</p>
        </div>

        <div className="flex items-center gap-3">
          <Avatar
            src={owner.avatar}
            alt={owner.name}
            sx={{ width: 30, height: 30 }}
          />
          <p className="text-sm text-slate-400">{owner.name}</p>
        </div>
      </div>

      <div>
        <div className="mb-3">
          <h1 className="text-lg font-bold text-primary mb-3 lg:text-2xl break-words">
            {title}
          </h1>
          <div className="text-base text-slate-500 break-words text-ellipsis">
            {parser(body)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <VoteButton
            id={id}
            authUser={authUser}
            upVote={upVoteThreadDetail}
            downVote={downVoteThreadDetail}
            neutralizeVote={neutralizeVoteThreadDetail}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
          />
        </div>
      </div>
    </section>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVoteThreadDetail: PropTypes.func.isRequired,
  downVoteThreadDetail: PropTypes.func.isRequired,
  neutralizeVoteThreadDetail: PropTypes.func.isRequired,
};
