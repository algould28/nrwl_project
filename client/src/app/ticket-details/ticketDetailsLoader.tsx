import Skeleton from '@mui/material/Skeleton';

export default function TicketDetailsLoader() {
  const ticketCardHeight = 110;

  return (
    <div>
      <Skeleton variant="rounded" width={'100%'} height={ticketCardHeight} />
    </div>
  );
}
