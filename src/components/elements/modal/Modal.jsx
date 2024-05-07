import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import { Box, Modal } from '@mui/material';
import useInput from '../../../hooks/useInput';
import Button from '../button/Button';

export default function ModalThread({ onClose, addThread, open }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    '@media (min-width: 700px)': {
      minWidth: 700,
    },
    '@media (max-width: 700px)': {
      minWidth: 400,
    },
  };

  function onInputBody(e) {
    setBody(e.target.innerHTML);
  }

  function onSubmit(e) {
    e.preventDefault();
    addThread({ title, body, category });
    onClose();
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-primary">Buat Diskusi Baru</h2>
          <button type="button" aria-label="close" onClick={onClose}>
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
              required
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
              required
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
      </Box>
    </Modal>
  );
}
ModalThread.propTypes = {
  onClose: PropTypes.func.isRequired,
  addThread: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
