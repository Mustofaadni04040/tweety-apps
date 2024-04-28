import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import Button from '../elements/button/Button';

export default function CommentInput({ addComment }) {
  const [comment, onCommentChange, setComment] = useInput('');
  const navigate = useNavigate();

  const onCommentSubmit = () => {
    addComment(comment);
    setComment('');
    navigate('/');
  };
  return (
    <div className="my-5">
      <h1 className="text-lg text-primary font-bold">Beri Komentar</h1>

      <form>
        <textarea
          className="w-full min-h-60 border border-slate-200 outline-none p-1 rounded focus:ring-1 focus:ring-primary"
          value={comment}
          onChange={onCommentChange}
        />
        <Button
          type="submit"
          classname="bg-primary p-2 w-full text-white rounded hover:bg-[#3825B5] duration-200"
          onClick={onCommentSubmit}
        >
          Kirim
        </Button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};
