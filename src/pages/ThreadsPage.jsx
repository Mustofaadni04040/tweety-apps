import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AddNewThreads from '../components/fragments/AddNewThreads';
import Leaderboards from './LeaderboardsPage';
import asyncPopulateUsersAndaThreads from '../states/shared/action';
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../states/threads/action';
import ThreadsList from '../components/fragments/ThreadsList';
import CategoriesThread from '../components/fragments/CategoriesThread';

export default function Threads({ onToggleModal }) {
  const [filter, setFilter] = useState('');
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndaThreads());
  }, [dispatch]);

  const categories = new Set(threads.map((thread) => thread.category));

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));
  return (
    <div className="container mx-auto lg:grid lg:grid-cols-4">
      <div className="lg:col-span-3 lg:overflow-y-auto lg:min-h-screen lg:max-h-screen">
        <AddNewThreads onToggleModal={onToggleModal} />
        <CategoriesThread
          categories={categories}
          filter={filter}
          setFilter={setFilter}
        />
        <ThreadsList
          threads={
            filter
              ? threadList.filter((thread) => thread.category === filter)
              : threadList
          }
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeutralizeVoteThread}
        />
      </div>
      <div className="hidden lg:block lg:col-span-1 lg:overflow-y-auto lg:min-h-screen">
        <Leaderboards type="AsideLeaderboards" />
      </div>
    </div>
  );
}

Threads.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
