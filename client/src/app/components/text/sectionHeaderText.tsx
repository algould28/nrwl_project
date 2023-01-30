import { Typography } from '@mui/material';

export interface SectionHeaderTextProps {
  text: string;
  color: string;
}

export function SectionHeaderText(props: SectionHeaderTextProps) {
  return (
    <Typography sx={{ fontSize: 20, color: props.color, fontWeight: 'bold' }}>
      {props.text}
    </Typography>
  );
}

export default SectionHeaderText;
