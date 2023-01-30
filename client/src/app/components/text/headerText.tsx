import { Typography } from '@mui/material';

export interface HeaderTextProps {
  text: string;
  color: string;
}

export function HeaderText(props: HeaderTextProps) {
  return (
    <Typography sx={{ fontSize: 24, color: props.color, fontWeight: 'bold' }}>
      {props.text}
    </Typography>
  );
}

export default HeaderText;
