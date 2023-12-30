// UserHomePage.js

import PropTypes from 'prop-types';

const UserHomePage = (props) => {
  return (
    <div>
      <h1>Hello Mr. {props.prop.name}</h1>
    </div>
  );
};

// Define prop types for UserHomePage
UserHomePage.propTypes = {
  prop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // Add other expected properties and their types
  }).isRequired,
};

export default UserHomePage;
