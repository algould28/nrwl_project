import { Ticket } from '@acme/shared-models';
import { getAssignedUser } from 'client/src/globalFunctions';
import { useEffect, useState } from 'react';
import DefaultSpacer from '../components/common/spacers/defaultSpacer';
import CardDescriptionText from '../components/text/cardDescriptionText';
import HeaderText from '../components/text/headerText';
import TicketCard from '../components/tickets/ticketCard';
import { useTicketsState } from '../state/ticketsState';
import { useUsersState } from '../state/usersState';
import { theme } from '../styles/theme';
import TicketDetailsLoader from './ticketDetailsLoader';

export function TicketDetails() {
  const url = window.location.href;
  const ticketId = url.split('/')[3];

  const { getTicketByIdIsLoading, getTicketById } = useTicketsState();
  const { users } = useUsersState();
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [ticketIsLoading, setTicketIsLoading] = useState(true);

  const getTicketDetails = async () => {
    setTicketIsLoading(true);
    const getTicketResponse = await getTicketById(parseInt(ticketId));
    setTicket(getTicketResponse);
    setTicketIsLoading(false);
  };

  useEffect(() => {
    getTicketDetails();
  }, [ticketId]);

  return (
    <div style={{ width: '40vw' }}>
      <HeaderText
        text={`Ticket Details for Ticket #${ticketId}`}
        color={theme.colors.text}
      />
      <DefaultSpacer />
      {(getTicketByIdIsLoading || ticketIsLoading) && <TicketDetailsLoader />}
      {!getTicketByIdIsLoading && !ticketIsLoading && (
        <>
          {ticket !== undefined && users !== undefined && (
            <TicketCard
              ticket={ticket}
              user={getAssignedUser(ticket, users)}
              isDetailsCard={true}
            />
          )}
          {ticket === undefined && (
            <CardDescriptionText
              color={theme.colors.warning}
              text="We're sorry, we couldn't find the ticket associated with that id :("
            />
          )}
        </>
      )}
    </div>
  );
}

export default TicketDetails;
