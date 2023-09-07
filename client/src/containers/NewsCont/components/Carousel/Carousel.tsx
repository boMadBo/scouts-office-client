import React, { Children, cloneElement, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Carousel.module.scss';

const PAGE_WIDTH = 680;

interface Props {
  children: any;
}

const Carousel = ({ children }: Props) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + PAGE_WIDTH;
      if (newOffset > 0) {
        return -(PAGE_WIDTH * (pages.length - 1));
      }
      return newOffset;
    });
  };

  const handleRightArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - PAGE_WIDTH;
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1));
      if (newOffset < maxOffset) {
        return 0;
      }
      return newOffset;
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, child => {
        return cloneElement(child, {
          style: {
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`,
            height: '100%',
          },
        });
      })
    );
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.window}>
        <FaChevronLeft className={styles.arrowLeft} onClick={handleLeftArrowClick} />
        <div
          className={styles.allPagesContainer}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {pages}
        </div>
        <FaChevronRight className={styles.arrowRight} onClick={handleRightArrowClick} />
      </div>
    </div>
  );
};

export default React.memo(Carousel);
