import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayouts from '../components/layouts/AuthLayouts';
import FormRegister from '../components/fragments/FormRegister';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <AuthLayouts type="register">
      <FormRegister register={onRegister} />
    </AuthLayouts>
  );
}
