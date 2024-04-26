import React from 'react';
import { HiPlusSm } from 'react-icons/hi';
import PropTypes from 'prop-types';
import Card from '../elements/card/Card';
import Button from '../elements/button/Button';

export default function AddNewThreads({ onToggleModal }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onToggleModal();
    }
  };
  return (
    <section className="mt-7 p-5 w-full max-w-3xl mx-auto">
      <div
        className="cursor-pointer group"
        onClick={onToggleModal}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <Card>
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-slate-400 group-hover:text-primary group-hover:duration-200">
              Buat diskusi baru
            </h1>
            <Button
              classname="bg-primary p-2 rounded-xl group-hover:bg-[#3825B5] duration-200"
              type="button"
              onClick={onToggleModal}
            >
              <HiPlusSm className="text-white text-lg" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

AddNewThreads.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
