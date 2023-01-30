import { Typography } from '@mui/material';

export interface CardHeaderTextProps {
  text: string;
  color: string;
}

export function CardHeaderText(props: CardHeaderTextProps) {
  return (
    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: props.color }}>
      {props.text}
    </Typography>
  );
}

export default CardHeaderText;
