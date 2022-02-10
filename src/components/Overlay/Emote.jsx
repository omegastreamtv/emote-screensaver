import { useState, useRef, useEffect } from 'react';

const MAX_WIDTH_RATIO = 2;

const getDurationX = (speed) => window.innerWidth / speed;
const getDurationY = (speed) => window.innerHeight / speed;

// Reset all animations. Pointlessly gets offsetWidth as a hack
// to trigger a browser reflow to force the reset.
const resetAnimation = (el, duration) => {
  const currAnim = el.style.animation;
  el.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  el.offsetWidth;
  el.style.top = 0;
  el.style.left = 0;
  el.style.animation = currAnim;
  el.style.animationDuration = `${duration}s`;
};

const Emote = ({ url, speed, size, onBounce }) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const animRefH = useRef();
  const animRefV = useRef();

  useEffect(() => {
    let image = new Image();
    image.src = url;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const maxWidth = size * MAX_WIDTH_RATIO;

      if (image.width > maxWidth) {
        const scaleFactor = maxWidth / image.width;
        setDimensions({ height: image.height * scaleFactor, width: maxWidth });
      } else {
        setDimensions({ height: size, width: size * aspectRatio });
      }
    };
  }, [url, size]);

  useEffect(() => {
    const animH = animRefH.current;
    const animV = animRefV.current;

    const durationX = getDurationX(speed * 3);
    const durationY = getDurationY(speed * 3);

    let timerX = setInterval(() => onBounce(), durationX * 1000);
    let timerY = setInterval(() => onBounce(), durationY * 1000);

    resetAnimation(animH, durationX);
    resetAnimation(animV, durationY);

    const handleResize = () => {
      clearInterval(timerX);
      clearInterval(timerY);

      timerX = setInterval(() => onBounce(), durationX * 1000);
      timerY = setInterval(() => onBounce(), durationY * 1000);

      resetAnimation(animH, durationX);
      resetAnimation(animV, durationY);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timerX);
      clearInterval(timerY);
    };
  }, [speed, size, onBounce]);

  return (
    <div
      className="anim-wrapper-h"
      ref={animRefH}
      style={{ width: `${dimensions.width}px` }}
    >
      <div className="anim-wrapper-v" ref={animRefV}>
        <img
          id="emote"
          src={url}
          alt="Emote"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        />
      </div>
    </div>
  );
};

export default Emote;
