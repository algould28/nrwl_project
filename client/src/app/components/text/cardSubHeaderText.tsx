import { Typography } from '@mui/material';

export interface CardSubheaderTextProps {
  text: string;
  color: string;
}

export function CardSubheaderText(props: CardSubheaderTextProps) {
  return (
    <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: props.color }}>
      {props.text}
    </Typography>
  );
}

export default CardSubheaderText;
