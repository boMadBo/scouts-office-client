import cn from 'classnames';
import React from 'react';
import styles from './modalListItemsWrap.module.scss';

interface Props {
  childModal: boolean;
  children: JSX.Element[];
}

const ModalListItemsWrap = ({ childModal, children }: Props) => {
  return <div className={cn(styles.modal, { [styles.childModal]: childModal })}>{children}</div>;
};

export default React.memo(ModalListItemsWrap);
