import React, { ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';

type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
};

export const TextReveal: React.FC<TextRevealProps> = ({ children, delay = 0.1, duration = 0.8, staggerDelay = 0.03 }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * staggerDelay,
        duration: duration,
      },
    }));
  }, [controls, delay, duration, staggerDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      className=""
    >
      {React.Children.map(children, (child, index) => (
        <motion.div custom={index} key={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TextReveal;
