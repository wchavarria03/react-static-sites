import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ logoSrc }) => (
  <div>
    <img src={logoSrc} alt="test" />
    Hello World
  </div>
);

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default Header;
