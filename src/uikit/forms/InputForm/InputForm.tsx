import { useField } from 'formik';
import React from 'react';
import styles from './inputForm.module.scss';
import { Input } from './styles';

const InputForm = ({ name, ...props  }: any) => {
  const [field, meta] = useField({ name });

  const { onBlur, value } = field;
  const { touched, error } = meta;
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.fieldLabel}>{props.label}</label>
      <Input     
        name={name}
        error={touched && Boolean(error)}
        helperText={touched && error}
        onChange={field.onChange}
        onBlur={onBlur}
        value={value}
        placeholder={props.label} 
      />
    </div>
  );
};

export default React.memo(InputForm);
