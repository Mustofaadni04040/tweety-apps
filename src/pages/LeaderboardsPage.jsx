import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/elements/card/Card';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';
import LeaderboardsItem from '../components/fragments/LeaderboardsItem';

export default function Leaderboards({ type }) {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  if (type === 'AsideLeaderboards') {
    return (
      <section>
        <aside className="p-5 mt-7 w-full max-h-[540px]">
          <h2 className="text-xl text-primary font-bold mb-5">
            Klasemen pengguna aktif
          </h2>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">Pengguna</p>
              <p className="text-slate-400 text-sm">Skor</p>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {leaderboards.map(({ user, score }) => (
                <LeaderboardsItem key={user.id} user={user} score={score} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    );
  }
  return (
    <section className="container mt-7 p-5 mx-auto max-w-4xl">
      <Card>
        <h2 className="text-xl text-primary font-bold mb-5">
          Klasemen pengguna aktif
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">Pengguna</p>
          <p className="text-slate-400 text-sm">Skor</p>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {leaderboards.map(({ user, score }) => (
            <LeaderboardsItem key={user.id} user={user} score={score} />
          ))}
        </div>
      </Card>
    </section>
  );
}

Leaderboards.propTypes = {
  type: PropTypes.string,
};
Leaderboards.defaultProps = {
  type: 'leaderboards',
};
