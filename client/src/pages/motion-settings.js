export const variants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2,
  },
};

export const transitions = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export const pageStyle = {
  // position: 'absolute',
};
