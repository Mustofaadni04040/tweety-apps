import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/fragments/Header';
import Threads from './pages/ThreadsPage';
import Leaderboards from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import DetailThreads from './pages/DetailThreadsPage';
import Loading from './components/elements/loading/Loading';
import { asyncCreateThread } from './states/threads/action';
import ErrorPage from './pages/404';
import ModalThread from './components/elements/modal/Modal';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <div className="font-inter">
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </>
    );
  }
  return (
    <>
      <Loading />
      <div className="font-inter">
        <Header logout={onSignOut} authUser={authUser} />
        {open && (
          <ModalThread
            onClose={handleClose}
            addThread={onAddThread}
            open={open}
          />
        )}
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/" element={<Threads onToggleModal={handleOpen} />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/threads/:threadId" element={<DetailThreads />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
