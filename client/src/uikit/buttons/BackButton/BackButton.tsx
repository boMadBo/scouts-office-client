import React from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import styles from './backButton.module.scss';

interface Props {
  text: string;
  onClick: ()=> void;
}

const BackButton = ({text, onClick}: Props) => {

return (
  <button className={styles.btnBack} onClick={onClick}>
    <MdKeyboardBackspace />
    <span>{text}</span>
  </button>
  )
}

export default React.memo(BackButton);