import React from 'react';
import parser from 'html-react-parser/lib/index';
import PropTypes from 'prop-types';
import { Avatar, Card, CardActions, CardContent } from '@mui/material';
import postedAt from '../../utils';
import VoteButton from './VoteButton';
import { userShape } from './ThreadItem';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
}) {
  return (
    <Card sx={{ p: 1, borderRadius: '12px' }}>
      <CardContent sx={{ pb: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={owner.avatar}
              alt={owner.name}
              sx={{ width: 30, height: 30 }}
            />
            <p className="text-primary text-xl font-bold">{owner.name}</p>
          </div>
          <p className="text-slate-400 text-sm">{postedAt(createdAt)}</p>
        </div>

        <div className="text-base text-slate-500 text-ellipsis mb-3 break-words">
          {parser(content)}
        </div>
      </CardContent>

      <CardActions
        sx={{
          ml: 1,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
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
      </CardActions>
    </Card>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};
export { commentShape };
