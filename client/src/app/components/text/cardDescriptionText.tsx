import { Typography } from '@mui/material';

export interface CardDescriptionTextProps {
  text: string;
  color: string;
}

export function CardDescriptionText(props: CardDescriptionTextProps) {
  return (
    <Typography sx={{ fontSize: 14, color: props.color }}>
      {props.text}
    </Typography>
  );
}

export default CardDescriptionText;
