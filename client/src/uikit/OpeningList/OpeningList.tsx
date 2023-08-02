import cn from 'classnames';
import React from 'react';
import styles from './openingList.module.scss';

interface Props {
  childModal: boolean;
  children: JSX.Element[];
}

const OpeningList = ({ childModal, children }: Props) => {
  return <div className={cn(styles.modal, {[styles.childModal]: childModal})}>{children}</div>;
};

export default React.memo(OpeningList);
