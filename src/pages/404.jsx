import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/elements/button/Button';

export default function ErrorPage() {
  const notFoundPage = useLocation();
  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-9xl mb-3 font-bold text-primary">404</h1>
      <p className="text-lg font-bold">Terjadi kesalahan.</p>
      <p className="text-sm mb-5">{`Oops! - ${notFoundPage.pathname} halaman tidak ditemukan`}</p>
      <Button
        type="button"
        classname="flex items-center gap-1 py-1 px-3 rounded bg-primary text-white hover:bg-[#3825B5] duration-200"
      >
        <Link to="/">Kembali</Link>
      </Button>
    </div>
  );
}
