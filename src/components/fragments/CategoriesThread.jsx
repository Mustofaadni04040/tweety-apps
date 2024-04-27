import React from 'react';
import PropTypes from 'prop-types';

export default function CategoriesThread({ categories, filter, setFilter }) {
  return (
    <section className="mt-7 px-5 mx-auto w-full max-w-3xl">
      <h2 className="mb-3 text-slate-400">Kategori Populer</h2>
      <div className="flex gap-3 flex-wrap">
        {Array.from(categories).map((category) => {
          if (filter === category) {
            return (
              <button
                key={category}
                className="text-white p-1 border bg-primary border-none rounded-lg"
                onClick={() => setFilter('')}
                type="button"
              >
                {`#${category}`}
              </button>
            );
          }
          return (
            <button
              key={category}
              className="text-primary p-1 border border-primary rounded-lg hover:bg-primary hover:text-white duration-200"
              onClick={() => setFilter(category)}
              type="button"
            >
              {`#${category}`}
            </button>
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
