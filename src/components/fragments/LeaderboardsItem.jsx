import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { userShape } from './ThreadItem';

export default function LeaderboardsItem({ user, score }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 45, height: 45 }}
        />
        <p className="text-lg text-slate-400">{user.name}</p>
      </div>
      <div>
        <p className="text-primary">{score}</p>
      </div>
    </div>
  );
}

LeaderboardsItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};
