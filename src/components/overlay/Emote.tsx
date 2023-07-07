'use client';

import { useState, useEffect, createRef } from 'react';

const MAX_WIDTH_RATIO = 2;

const getDurationX = (speed: number) => window.innerWidth / speed;
const getDurationY = (speed: number) => window.innerHeight / speed;

// Reset all animations. Pointlessly gets offsetWidth as a hack
// to trigger a browser reflow to force the reset.
const resetAnimation = (el: HTMLElement, duration: number) => {
  const currAnim = el.style.animation;
  el.style.animation = 'none';
  el.offsetWidth;
  el.style.top = '0';
  el.style.left = '0';
  el.style.animation = currAnim;
  el.style.animationDuration = `${duration}s`;
};

type Props = {
  url: string;
  speed: number;
  size: number;
  onBounce: () => void;
};

function Emote({ url, speed, size, onBounce }: Props) {
  const [dimensions, setDimensions] = useState<[number, number]>([100, 100]);

  const animRefH = createRef<HTMLDivElement>();
  const animRefV = createRef<HTMLDivElement>();

  useEffect(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const maxWidth = size * MAX_WIDTH_RATIO;

      if (image.width > maxWidth) {
        const scaleFactor = maxWidth / image.width;
        setDimensions([image.height * scaleFactor, maxWidth]);
      } else {
        setDimensions([size, size * aspectRatio]);
      }
    };
  }, [url, size]);

  useEffect(() => {
    const animH = animRefH.current as HTMLDivElement;
    const animV = animRefV.current as HTMLDivElement;

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
      style={{ width: `${dimensions[0]}px` }}
    >
      <div className="anim-wrapper-v" ref={animRefV}>
        <img
          id="emote"
          src={url}
          alt="Emote"
          style={{
            width: `${dimensions[0]}px`,
            height: `${dimensions[1]}px`,
          }}
        />
      </div>
    </div>
  );
}

export default Emote;
