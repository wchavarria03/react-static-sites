import React from 'react';
import Header from 'components/Header';
import logo from 'images/puppy.jpg';
import renderElement from 'utils/render';
import './styles.scss';

const LandingContainer = () => (
  <div>
    <Header logoSrc={logo} />
  </div>
);


module.exports = renderElement(<LandingContainer />);
