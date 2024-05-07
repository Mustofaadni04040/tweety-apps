import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { AiOutlineLogout } from 'react-icons/ai';
import Logo from '../elements/logo/Logo';
import { userShape } from './ThreadItem';

export default function Header({ authUser, logout }) {
  const location = useLocation();

  return (
    location.pathname !== '/*' && (
      <section className="shadow bg-white sticky top-0 left-0 z-50">
        <div className="container p-5 mx-auto flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <div className="flex items-center justify-between gap-5">
            <nav className="flex items-center justify-between gap-5">
              <ul>
                <li>
                  <Link
                    to="/"
                    className={
                      location.pathname === '/'
                        ? 'text-sm border-b-2 border-primary py-3'
                        : 'text-sm text-slate-400 hover:text-black py-3'
                    }
                  >
                    Threads
                  </Link>
                </li>
              </ul>
              <ul className="lg:hidden">
                <li>
                  <Link
                    to="/leaderboards"
                    className={
                      location.pathname === '/leaderboards'
                        ? 'text-sm border-b-2 border-primary py-3'
                        : 'text-sm text-slate-400 hover:text-black py-3'
                    }
                  >
                    leaderboards
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              className="text-primary flex items-center gap-1 hover:text-[#3825B5] duration-200"
              onClick={logout}
            >
              <AiOutlineLogout />
              <span className="text-sm">Sign Out</span>
            </button>
            <Avatar
              src={authUser.avatar}
              alt="Profile"
              sx={{ width: 30, height: 30 }}
            />
          </div>
        </div>
      </section>
    )
  );
}

Header.propTypes = {
  authUser: PropTypes.shape(userShape).isRequired,
  logout: PropTypes.func.isRequired,
};
