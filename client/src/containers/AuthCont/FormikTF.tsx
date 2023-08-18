import TextField from '@/uikit/TextField';
import { useField } from 'formik';
import React from 'react';

const FormikTF = ({ name, ...props }: any) => {
  const [field, meta] = useField({ name });

  const { onBlur, value } = field;
  const { touched, error } = meta;

  return (
    <TextField
      name={name}
      label={props.label}
      error={touched && Boolean(error)}
      helperText={touched && error}
      onChange={field.onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default React.memo(FormikTF);
