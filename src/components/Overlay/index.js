import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './overlay.css';

const Overlay = ({ children }) => {
  const container = document.createElement('div');
  useEffect(() => {
    const overlayRoot = document.getElementById('overlay');
    overlayRoot.append(container);
    document.body.style.overflow = 'hidden';

    return () => {
      overlayRoot.removeChild(container);
      document.body.style.overflow = 'visible';
    };
  });
  return ReactDOM.createPortal(children, container);
};

Overlay.proptTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
