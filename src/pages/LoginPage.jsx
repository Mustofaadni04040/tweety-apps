import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayouts from '../components/layouts/AuthLayouts';
import FormLogin from '../components/fragments/FormLogin';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <AuthLayouts type="login">
      <FormLogin login={onLogin} />
    </AuthLayouts>
  );
}
