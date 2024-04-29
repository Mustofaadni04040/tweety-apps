import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from './ThreadItem';

export default function LeaderboardsItem({ user, score }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full"
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
