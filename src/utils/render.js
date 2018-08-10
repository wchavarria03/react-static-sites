import ReactDOM from 'react-dom';

const renderElement = (elem) => {
  ReactDOM.render(elem, document.getElementById('root'));
};

module.exports = renderElement;
