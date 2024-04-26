import React from 'react';
import PropTypes from 'prop-types';
import Card from '../elements/card/Card';

export default function ThreadItem() {
  return (
    <div className="mt-7 p-5 w-full max-w-3xl mx-auto">
      <Card>{/* <div></div> */}</Card>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  threadOwner: PropTypes.shape(userShape).isRequired,
};

// ThreadItem.propTypes = {
//   ...threadItemShape,
//   authUser: PropTypes.string.isRequired,
//   upVote: PropTypes.func.isRequired,
//   downVote: PropTypes.func.isRequired,
//   neturalizeVote: PropTypes.func.isRequired,
// };

export { threadItemShape, userShape };
