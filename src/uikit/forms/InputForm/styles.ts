import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Input = styled(TextField)({
  width: '292px',
  height: '30px',
  border: 0,
  fontSize: '16px',
  lineHeight: '18px',
  fontWeight: 300,
  color: '#000',
  borderRadius: '4px',
  backgroundColor: 'var(--input)',
  '& .MuiInputBase-input': {
    width: '280px',
    height: '18px',
    padding: '6px',
    borderImageWidth: 0,
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 300,
    color: '#000',
    '&::placeholder': {
      color: '#000',
    },
  },
});
