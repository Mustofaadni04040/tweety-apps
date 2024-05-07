import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function CategoriesThread({ categories, filter, setFilter }) {
  return (
    <section className="mt-7 px-5 mx-auto w-full max-w-3xl">
      <h2 className="mb-3 text-slate-400">Kategori Populer</h2>
      <div className="flex gap-3 flex-wrap">
        {Array.from(categories).map((category) => {
          if (filter === category) {
            return (
              <Button
                key={category}
                sx={{
                  color: 'white',
                  backgroundColor: '#543fdc',
                  p: 1,
                  border: 'none',
                  borderRadius: '12px',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#543fdc',
                    border: 'none',
                  },
                }}
                onClick={() => setFilter('')}
                type="button"
              >
                {`#${category}`}
              </Button>
            );
          }
          return (
            <Button
              key={category}
              sx={{
                color: '#543fdc',
                backgroundColor: 'transparent',
                p: 1,
                border: '1px solid #543fdc',
                borderRadius: '12px',
                transitionDuration: '0.4s',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#543fdc',
                },
              }}
              onClick={() => setFilter(category)}
              type="button"
            >
              {`#${category}`}
            </Button>
          );
        })}
      </div>
    </section>
  );
}

CategoriesThread.propTypes = {
  categories: PropTypes.objectOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
