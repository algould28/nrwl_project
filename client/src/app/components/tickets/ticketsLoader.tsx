import Skeleton from '@mui/material/Skeleton';
import DefaultSpacer from '../common/spacers/defaultSpacer';
import HalfSpacer from '../common/spacers/halfSpacer';

export default function TicketsLoader() {
  const ticketCardHeight = 110;

  return (
    <div>
      <Skeleton variant="text" width={'40%'} sx={{ fontSize: 20 }} />
      <HalfSpacer />
      <Skeleton variant="rounded" width={'100%'} height={ticketCardHeight} />
      <DefaultSpacer />
      <Skeleton variant="rounded" width={'100%'} height={ticketCardHeight} />
      <DefaultSpacer />
      <Skeleton variant="rounded" width={'100%'} height={ticketCardHeight} />
    </div>
  );
}
