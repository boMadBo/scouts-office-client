import cn from 'classnames';
import React from 'react';
import styles from './editButton.module.scss';

interface Props {
  text: string;
  width?: 'width100'
  height?: 'height32'
  onClick: () => void
}

const EditButton = ({text, width, height, onClick}: Props) => {

return (
  <button onClick={onClick} className={cn(styles.editing, width && styles[width], height && styles[height])}>
    {text}
  </button>
  )
}

export default React.memo(EditButton);