import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import useInput from '../../../hooks/useInput';
import Button from '../button/Button';

export default function Modal({ onToggleModal, addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  function onInputBody(e) {
    setBody(e.target.innerHTML);
  }

  function onSubmit(e) {
    e.preventDefault();
    addThread({ title, body, category });
    onToggleModal();
  }
  return (
    <div className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-4 px-7 rounded-xl min-w-96 lg:min-w-[700px] lg:max-w-[700px]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-primary">Buat Diskusi Baru</h2>
          <button onClick={onToggleModal} type="button" aria-label="close">
            <IoClose className="text-xl" />
          </button>
        </div>

        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <label htmlFor="title" className="text-sm">
            Judul
            <br />
            <input
              type="text"
              id="title"
              onChange={onTitleChange}
              value={title}
              placeholder="Judul"
              className="w-full border border-slate-200 p-1 outline-none rounded focus:ring-1 focus:ring-primary placeholder:text-sm"
            />
          </label>
          <label htmlFor="category" className="text-sm">
            kategori
            <br />
            <input
              type="text"
              id="category"
              onChange={onCategoryChange}
              value={category}
              placeholder="Kategori"
              className="w-full border border-slate-200 p-1 outline-none rounded focus:ring-1 focus:ring-primary placeholder:text-sm"
            />
          </label>
          <div
            className="w-full min-h-60 border border-slate-200 outline-none p-1 rounded focus:ring-1 focus:ring-primary"
            value={body}
            onInput={onInputBody}
            contentEditable
          />
          <Button
            type="submit"
            classname="bg-primary p-2 w-full text-white rounded hover:bg-[#3825B5] duration-200"
          >
            Tambah
          </Button>
        </form>
      </div>
    </div>
  );
}
Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  addThread: PropTypes.func.isRequired,
};
