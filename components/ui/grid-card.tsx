import React from 'react';
import PropTypes from 'prop-types';

interface GridCardProps {
  area: string;
  children: React.ReactNode;
  className?: string;
}

const GridCard: React.FC<GridCardProps> = ({ area, children, className = '' }) => {
  return (
    <div className={`item ${area} rounded-lg ${className}`}>
      {children}
    </div>
  );
};

GridCard.propTypes = {
  area: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default GridCard;
