import React from 'react';

type SpacerProps = {
  level?: 1 | 2 | 3 | 4 | 5;
};

const Spacer: React.FC<SpacerProps> = ({ level = 1 }) => {
  const spacing = {
    1: 'mt-[1vmax] xs:mt-[1.5vmax] sm:mt-[2vmax] md:mt-[2.5vmax] lg:mt-[3vmax]',
    2: 'mt-[2vmax] xs:mt-[2.5vmax] sm:mt-[3vmax] md:mt-[3.5vmax] lg:mt-[4vmax]',
    3: 'mt-[3vmax] xs:mt-[3.5vmax] sm:mt-[4vmax] md:mt-[4.5vmax] lg:mt-[5vmax]',
    4: 'mt-[4vmax] xs:mt-[4.5vmax] sm:mt-[5vmax] md:mt-[5.5vmax] lg:mt-[6vmax]',
    5: 'mt-[5vmax] xs:mt-[5.5vmax] sm:mt-[6vmax] md:mt-[6.5vmax] lg:mt-[7vmax]',
  };

  return <div className={spacing[level]}></div>;
};

export default Spacer;