import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/fragments/Header';
import Threads from './pages/ThreadsPage';
import Leaderboards from './pages/LeaderboardsPage';
import Modal from './components/elements/modal/Modal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import DetailThreads from './pages/DetailThreadsPage';

function App() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="font-inter">
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="font-inter">
      <Header logout={onSignOut} authUser={authUser} />
      {modal && <Modal onToggleModal={toggleModal} />}
      <Routes>
        <Route path="/" element={<Threads onToggleModal={toggleModal} />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/threads/:id" element={<DetailThreads />} />
      </Routes>
    </div>
  );
}

export default App;
