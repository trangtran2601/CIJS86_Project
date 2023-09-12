import React from 'react';
import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import noImage from '../../assets/images/noImage.png';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, className, fallback: customFallback = noImage , ...props }, ref) => {
  const [fallback, setFallback] = useState();
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      {...props}
      src={fallback || src}
      alt={alt}
      onError={handleError}
    />
  );
});

export default Image;
