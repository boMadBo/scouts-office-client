import React from "react";
import style from "./TField.module.scss";

interface Props {
  label: string;
}

const TField = ({ label, ...props }: any) => {
  return (
    <div className={style.field_wrap}>
      <label className={style.field_label}>{label}</label>
      <input
        type="text"
        {...props}
        placeholder={label}
        className={style.field_input}
      />
      <fieldset className={style.hidden_fieldset}></fieldset>
    </div>
  );
};

export default React.memo(TField);
